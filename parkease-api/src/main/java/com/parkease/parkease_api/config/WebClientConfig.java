package com.parkease.parkease_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient radarWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.radar.io/v1")
                // ✅ Use your *SECRET SERVER KEY*, not publishable
                .defaultHeader("Authorization", "prj_live_sk_19031181e15a16f707f62f53ac06b96bf0074d43")
                .build();
    }
}
