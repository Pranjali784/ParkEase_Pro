package com.parkease.parkease_api.service;

import com.parkease.parkease_api.dto.*;
import com.parkease.parkease_api.model.ParkingSpace;
import com.parkease.parkease_api.model.User;
import com.parkease.parkease_api.repositories.ParkingSpaceRepository;
import com.parkease.parkease_api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class ParkingSpaceService {

    @Autowired
    private ParkingSpaceRepository parkingSpaceRepository;

    @Autowired
    private UserRepository userRepository;

    /* =========================
       REQUIRED BY CONTROLLER
       ========================= */

    // ✅ FIX #1
    public List<ParkingSpaceSummaryDTO> getAllSummaries() {
        return parkingSpaceRepository.findAll()
                .stream()
                .map(ParkingSpaceMapper::toSummary)
                .toList();
    }

    // ✅ FIX #2
    public List<ParkingSpaceSummaryDTO> getSpacesByOwner(String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return parkingSpaceRepository.findByOwner(owner)
                .stream()
                .map(ParkingSpaceMapper::toSummary)
                .toList();
    }

    // ✅ FIX #3
    public ParkingSpaceDetailDTO addSpaceAndReturnDetails(
            ParkingSpaceRequestDTO dto,
            String ownerEmail
    ) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        ParkingSpace space = new ParkingSpace();
        space.setOwner(owner);
        space.setAddress(dto.getAddress());
        space.setVehicleTypes(dto.getVehicleTypes());
        space.setModelType(dto.getModelType());
        space.setLatitude(dto.getLatitude());
        space.setLongitude(dto.getLongitude());
        space.setAvailableFrom(dto.getAvailableFrom());
        space.setAvailableTo(dto.getAvailableTo());
        space.setCapacity(1);
        space.setNotes("");

        ParkingSpace saved = parkingSpaceRepository.save(space);
        return ParkingSpaceMapper.toDetail(saved);
    }

    // ✅ FIX #4
    public ParkingSpaceDetailDTO getDetails(Long id) {
        ParkingSpace ps = parkingSpaceRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(NOT_FOUND, "Parking space not found"));

        return ParkingSpaceMapper.toDetail(ps);
    }

    /* =========================
       SEARCH (10 KM RADIUS)
       ========================= */

    public SearchResponseDTO searchSummaries(double centerLat, double centerLon) {

        Coordinates center = new Coordinates(
                BigDecimal.valueOf(centerLat),
                BigDecimal.valueOf(centerLon)
        );

        // ✅ EXACT REQUIREMENT
        double radiusKm = 10.0;

        List<ParkingSpaceSummaryDTO> spots =
                parkingSpaceRepository.findSpacesNearby(centerLat, centerLon, radiusKm)
                        .stream()
                        .map(ParkingSpaceMapper::toSummary)
                        .toList();

        return new SearchResponseDTO(center, spots);
    }
}
