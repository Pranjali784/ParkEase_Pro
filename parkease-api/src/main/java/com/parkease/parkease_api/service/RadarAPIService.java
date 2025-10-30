package com.parkease.parkease_api.service;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.parkease.parkease_api.dto.Coordinates;
import com.parkease.parkease_api.dto.RadarGeocodeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RadarAPIService {
    private final WebClient radarWebClient;
    @Autowired
    public RadarAPIService(WebClient radarWebClient){
        this.radarWebClient = radarWebClient;
    }
    public Coordinates geocode(String address){
        try{
            RadarGeocodeResponse response = radarWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/geocode/forward")
                            .queryParam("query", address)
                            .build())
                    .retrieve()
                    .bodyToMono(RadarGeocodeResponse.class)
                    .block(); // .block() makes this synchronous. Good for a simple service.

            if (response != null && response.getAddresses() != null && !response.getAddresses().isEmpty()) {
                // Return the coordinates of the first match
                var firstAddress = response.getAddresses().get(0);
                return new Coordinates(firstAddress.getLatitude(), firstAddress.getLongitude());
            } else {
                // Handle no results
                System.err.println("No geocoding results for address: " + address);
                // Return a default or throw an exception
                throw new RuntimeException("Could not geocode address: " + address);
            }
        } catch(Exception e){
            System.out.println("Error during geocoding: " + e.getMessage());
            throw new RuntimeException("Geocoding service error", e);
        }
    }

}
