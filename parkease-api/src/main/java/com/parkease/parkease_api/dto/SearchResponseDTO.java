package com.parkease.parkease_api.dto;

import java.util.List;

public record SearchResponseDTO(
        Coordinates center,
        List<ParkingSpaceSummaryDTO> spots
) {
}