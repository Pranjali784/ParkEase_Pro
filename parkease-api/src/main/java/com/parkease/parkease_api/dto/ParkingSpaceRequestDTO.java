package com.parkease.parkease_api.dto;

import java.math.BigDecimal; // <-- ADD IMPORT
import java.time.LocalTime;

public class ParkingSpaceRequestDTO {
    private String address;
    private String vehicleTypes;
    private String modelType;
    private LocalTime availableFrom;
    private LocalTime availableTo;

    // --- ADD THESE TWO LINES ---
    private BigDecimal latitude;
    private BigDecimal longitude;

    // Getters and Setters
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getVehicleTypes() { return vehicleTypes; }
    public void setVehicleTypes(String vehicleTypes) { this.vehicleTypes = vehicleTypes; }
    public String getModelType() { return modelType; }
    public void setModelType(String modelType) { this.modelType = modelType; }
    public LocalTime getAvailableFrom() { return availableFrom; }
    public void setAvailableFrom(LocalTime availableFrom) { this.availableFrom = availableFrom; }
    public LocalTime getAvailableTo() { return availableTo; }
    public void setAvailableTo(LocalTime availableTo) { this.availableTo = availableTo; }

    // --- ADD THESE GETTERS/SETTERS ---
    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }
    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }
}