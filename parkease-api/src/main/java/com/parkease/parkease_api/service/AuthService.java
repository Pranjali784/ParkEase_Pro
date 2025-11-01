package com.parkease.parkease_api.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.parkease.parkease_api.dto.LoginDto;
import com.parkease.parkease_api.dto.RegisterDto;
import com.parkease.parkease_api.model.User;
import com.parkease.parkease_api.repositories.UserRepository;
import com.parkease.parkease_api.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.UUID;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final GoogleIdTokenVerifier verifier;

    // Inject the Google Client ID from .env
    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       @Value("${spring.security.oauth2.client.registration.google.client-id}") String googleClientId) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;

        // Initialize the Google Verifier
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
    }

    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(), loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }

    public String register(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        userRepository.save(user);
        return "User registered successfully!";
    }

    // This is the modified Google login method
    public String loginWithGoogle(String idTokenString) {
        try {
            // 1. Verify the ID token from the frontend
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                throw new RuntimeException("Invalid Google ID Token.");
            }

            // 2. Get user info from the token payload
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // 3. Find or create user in our database
            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setEmail(email);
                        newUser.setName(name);
                        newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                        return userRepository.save(newUser);
                    });

            // 4. Create an Authentication object for our app
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    user.getEmail(),
                    null,
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            );

            // 5. Generate and return *our* JWT token
            return jwtTokenProvider.generateToken(authentication);

        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException("Google token verification failed", e);
        }
    }
}