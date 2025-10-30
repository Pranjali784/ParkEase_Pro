package com.parkease.parkease_api.service;
import java.math.BigDecimal;
import com.parkease.parkease_api.dto.*;
import com.parkease.parkease_api.model.ParkingSpace;
import com.parkease.parkease_api.model.User; // IMPORT USER
import com.parkease.parkease_api.repositories.ParkingSpaceRepository;
import com.parkease.parkease_api.repositories.UserRepository; // IMPORT USER REPO
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class ParkingSpaceService {

    @Autowired
    private ParkingSpaceRepository parkingSpaceRepository;

    // INJECT USER REPO
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public RadarAPIService radarAPIService;

    // ADD THIS NEW METHOD
    public List<ParkingSpaceSummaryDTO> getSpacesByOwner(String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return parkingSpaceRepository.findByOwner(owner)
                .stream()
                .map(ParkingSpaceMapper::toSummary)
                .collect(Collectors.toList());
    }

    // MODIFIED METHOD
    public ParkingSpaceDetailDTO addSpaceAndReturnDetails(ParkingSpaceRequestDTO dto, String ownerEmail) {
        // Find the owner
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        // --- REMOVED THIS BLOCK ---
        // Coordinates coords;
        // try {
        //     coords = radarAPIService.geocode(dto.getAddress());
        // } catch (Exception e) {
        //     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could not find address: " + dto.getAddress());
        // }
        // -------------------------

        // Create new ParkingSpace entity
        ParkingSpace space = new ParkingSpace();
        space.setOwner(owner);
        space.setAddress(dto.getAddress()); // Set address from DTO
        space.setVehicleTypes(dto.getVehicleTypes());
        space.setModelType(dto.getModelType());
        space.setAvailableFrom(dto.getAvailableFrom());
        space.setAvailableTo(dto.getAvailableTo());

        // --- SET COORDS DIRECTLY FROM DTO ---
        space.setLatitude(dto.getLatitude());
        space.setLongitude(dto.getLongitude());
        // ------------------------------------

        space.setCapacity(1); // Default to 1 spot
        space.setNotes("");   // Default to empty notes

        ParkingSpace saved = parkingSpaceRepository.save(space);
        return ParkingSpaceMapper.toDetail(saved);
    }

    // --- MODIFIED METHOD ---
    public SearchResponseDTO searchSummaries(double centerLat, double centerLon) {

        // We no longer need to geocode. We get the coords directly.
        Coordinates center = new Coordinates(
                BigDecimal.valueOf(centerLat),
                BigDecimal.valueOf(centerLon)
        );

        double radiusKm = 15.0; // 15km radius

        List<ParkingSpace> entities =
                parkingSpaceRepository.findSpacesNearby(centerLat, centerLon, radiusKm);

        List<ParkingSpaceSummaryDTO> dtos = entities.stream()
                .map(ParkingSpaceMapper::toSummary)
                .collect(Collectors.toList());

        return new SearchResponseDTO(center, dtos);
    }

    // Details
    public ParkingSpaceDetailDTO getDetails(Long id) {
        ParkingSpace ps = parkingSpaceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Parking space not found"));
        return ParkingSpaceMapper.toDetail(ps);
    }

    public List<ParkingSpaceSummaryDTO> getAllSummaries() {
        return parkingSpaceRepository.findAll()
                .stream()
                .map(ParkingSpaceMapper::toSummary)
                .toList();
    }
}