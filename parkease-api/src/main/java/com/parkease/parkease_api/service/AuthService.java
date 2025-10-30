package com.parkease.parkease_api.service;

import com.parkease.parkease_api.dto.LoginDto;
import com.parkease.parkease_api.dto.RegisterDto;
import com.parkease.parkease_api.model.User;
import com.parkease.parkease_api.repositories.UserRepository;
import com.parkease.parkease_api.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;

import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RestTemplate restTemplate;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       RestTemplate restTemplate) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.restTemplate = restTemplate;
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
            throw new RuntimeException("Email is already taken!"); // Handle this better
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginWithGoogle(String googleAccessToken) {
        // 1. Get user info from Google
        String url = "https://www.googleapis.com/oauth2/v3/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(googleAccessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        Map<String, Object> userInfo = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, Map.class).getBody();

        if (userInfo == null) {
            throw new RuntimeException("Could not get user info from Google");
        }

        String email = (String) userInfo.get("email");
        String name = (String) userInfo.get("name");

        // 2. Find or create user in local database
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    // Create new user if they don't exist
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    // Create a random, secure password as it's required
                    newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                    return userRepository.save(newUser);
                });

        // 3. Create a Spring Security Authentication object
        // We trust Google, so we manually create the auth token
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                null, // No password
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")) // Grant a default role
        );

        // 4. Generate and return your app's JWT token
        return jwtTokenProvider.generateToken(authentication);
    }
}