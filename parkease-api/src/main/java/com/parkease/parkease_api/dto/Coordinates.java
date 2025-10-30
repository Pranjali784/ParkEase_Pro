package com.parkease.parkease_api.dto;

import java.math.BigDecimal;

public record Coordinates (
    BigDecimal latitude,
    BigDecimal longitude
) {
    @Override
    public BigDecimal latitude() {
        return latitude;
    }

    @Override
    public BigDecimal longitude() {
        return longitude;
    }
}
