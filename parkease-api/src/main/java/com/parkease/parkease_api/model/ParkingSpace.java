// com.parkease.parkease_api/model/ParkingSpace.java
package com.parkease.parkease_api.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalTime;

@Entity
@Table(name = "parking_spaces")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"}) // safe
public class ParkingSpace {

    public ParkingSpace() {
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)       // <-- LAZY avoids heavy graphs
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnoreProperties({"password","parkingSpaces"}) // <-- if owner serialized, strip these
    private User owner;

    @Column(nullable = false) private String address;

    private String modelType;

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalTime getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(LocalTime availableTo) {
        this.availableTo = availableTo;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public LocalTime getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(LocalTime availableFrom) {
        this.availableFrom = availableFrom;
    }

    public String getVehicleTypes() {
        return vehicleTypes;
    }

    public void setVehicleTypes(String vehicleTypes) {
        this.vehicleTypes = vehicleTypes;
    }

    public String getModelType() {
        return modelType;
    }

    public void setModelType(String modelType) {
        this.modelType = modelType;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(nullable = false) private BigDecimal latitude;
    @Column(nullable = false) private BigDecimal longitude;
    private String vehicleTypes;
    @Column(nullable = false) private int capacity;
    @Column(nullable = false) private LocalTime availableFrom;
    @Column(nullable = false) private LocalTime availableTo;
    private String notes;

    // constructors + getters/setters...

    public ParkingSpace(Long id, User owner, String address, String modelType, BigDecimal latitude, BigDecimal longitude, String vehicleTypes, int capacity, LocalTime availableTo, LocalTime availableFrom, String notes) {
        this.id = id;
        this.owner = owner;
        this.address = address;
        this.modelType = modelType;
        this.latitude = latitude;
        this.longitude = longitude;
        this.vehicleTypes = vehicleTypes;
        this.capacity = capacity;
        this.availableTo = availableTo;
        this.availableFrom = availableFrom;
        this.notes = notes;
    }

}
