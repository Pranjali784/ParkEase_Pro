package com.parkease.parkease_api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class PricingService {
    private final WebClient webClient;

    public PricingService(WebClient.Builder webClientBuilder) {
        // Assuming docker-compose environment where ml-service is reachable at http://ml-service:8000
        this.webClient = webClientBuilder.baseUrl("http://ml-service:8000").build();
    }

    public BigDecimal getSuggestedPrice(BigDecimal lat, BigDecimal lon, LocalTime availableFrom) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("latitude", lat);
            body.put("longitude", lon);
            if (availableFrom != null) {
                body.put("available_from", availableFrom.toString());
            }

            Map<String, Object> response = webClient.post()
                    .uri("/predict-price")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("suggested_price_per_hour")) {
                return BigDecimal.valueOf(((Number) response.get("suggested_price_per_hour")).doubleValue());
            }
        } catch (Exception e) {
            // Log fallback error
            System.err.println("Failed to reach ML service, using fallback pricing. Error: " + e.getMessage());
        }
        return BigDecimal.valueOf(5.00); // Fallback price
    }
}
