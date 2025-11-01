package com.parkease.parkease_api.config;

import org.springframework.beans.factory.annotation.Value; // <-- ADD IMPORT
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    // Inject the key from application.properties / .env
    @Value("${radar.api.key}")
    private String radarSecretKey;

    @Bean
    public WebClient radarWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.radar.io/v1")
                // Use the variable, not a hard-coded key
                .defaultHeader("Authorization", radarSecretKey)
                .build();
    }
}