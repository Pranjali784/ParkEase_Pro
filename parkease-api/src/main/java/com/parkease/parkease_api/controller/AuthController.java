package com.parkease.parkease_api.controller;

import com.parkease.parkease_api.dto.JwtAuthResponse;
import com.parkease.parkease_api.dto.LoginDto;
import com.parkease.parkease_api.dto.RegisterDto;
import com.parkease.parkease_api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);
        return ResponseEntity.ok(new JwtAuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // This is the one, correct method for Google login
    @PostMapping("/google")
    public ResponseEntity<JwtAuthResponse> loginWithGoogle(@RequestBody Map<String, String> payload) {
        // It expects a JSON body like {"idToken": "..."}
        String idToken = payload.get("idToken");
        String appToken = authService.loginWithGoogle(idToken);
        return ResponseEntity.ok(new JwtAuthResponse(appToken));
    }
}