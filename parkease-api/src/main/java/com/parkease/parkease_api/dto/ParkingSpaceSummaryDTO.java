package com.parkease.parkease_api.dto;

import java.math.BigDecimal;
import java.time.LocalTime;

public class ParkingSpaceSummaryDTO {
    private Long id;
    private String address;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String vehicleTypes;
    private String modelType; // <-- Field must exist
    private int capacity;
    private LocalTime availableFrom;
    private LocalTime availableTo;

    public ParkingSpaceSummaryDTO() {}

    // --- THIS IS THE CONSTRUCTOR THAT MUST MATCH ---
    public ParkingSpaceSummaryDTO(Long id, String address, BigDecimal latitude, BigDecimal longitude,
                                  String vehicleTypes, String modelType, int capacity,
                                  LocalTime availableFrom, LocalTime availableTo) {
        this.id = id;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.vehicleTypes = vehicleTypes;
        this.modelType = modelType; // <-- Field must be set
        this.capacity = capacity;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getAddress() { return address; }
    public BigDecimal getLatitude() { return latitude; }
    public BigDecimal getLongitude() { return longitude; }
    public String getVehicleTypes() { return vehicleTypes; }
    public String getModelType() { return modelType; }
    public int getCapacity() { return capacity; }
    public LocalTime getAvailableFrom() { return availableFrom; }
    public LocalTime getAvailableTo() { return availableTo; }

    public void setId(Long id) { this.id = id; }
    public void setAddress(String address) { this.address = address; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }
    public void setVehicleTypes(String vehicleTypes) { this.vehicleTypes = vehicleTypes; }
    public void setModelType(String modelType) { this.modelType = modelType; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public void setAvailableFrom(LocalTime availableFrom) { this.availableFrom = availableFrom; }
    public void setAvailableTo(LocalTime availableTo) { this.availableTo = availableTo; }
}