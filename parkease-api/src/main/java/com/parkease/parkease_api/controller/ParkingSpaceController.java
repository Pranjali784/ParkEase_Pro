package com.parkease.parkease_api.controller;

import com.parkease.parkease_api.dto.ParkingSpaceDetailDTO;
import com.parkease.parkease_api.dto.ParkingSpaceRequestDTO; // IMPORT NEW DTO
import com.parkease.parkease_api.dto.ParkingSpaceSummaryDTO;
import com.parkease.parkease_api.dto.SearchResponseDTO;
// import com.parkease.parkease_api.model.ParkingSpace; // No longer need this
import com.parkease.parkease_api.service.ParkingSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal; // IMPORT PRINCIPAL
import java.util.List;

@RestController
@RequestMapping("/api/parking-spaces")
public class ParkingSpaceController {

    @Autowired
    private ParkingSpaceService parkingSpaceService;

    @GetMapping
    public ResponseEntity<List<ParkingSpaceSummaryDTO>> getAllSpaces() {
        List<ParkingSpaceSummaryDTO> spaces = parkingSpaceService.getAllSummaries();
        return ResponseEntity.ok(spaces);
    }


    // ADD THIS NEW ENDPOINT
    @GetMapping("/my-spaces")
    public ResponseEntity<List<ParkingSpaceSummaryDTO>> getMySpaces(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<ParkingSpaceSummaryDTO> spaces = parkingSpaceService.getSpacesByOwner(principal.getName());
        return ResponseEntity.ok(spaces);
    }

    // MODIFIED METHOD
    @PostMapping
    public ResponseEntity<ParkingSpaceDetailDTO> addParkingSpace(
            @RequestBody ParkingSpaceRequestDTO requestDto, Principal principal) {

        // principal.getName() will be the user's email (username)
        ParkingSpaceDetailDTO saved = parkingSpaceService.addSpaceAndReturnDetails(requestDto, principal.getName());
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // --- MODIFIED METHOD ---
    @GetMapping("/search")
    public ResponseEntity<SearchResponseDTO> searchSpaces(
            @RequestParam("lat") double lat,
            @RequestParam("lon") double lon) {

        SearchResponseDTO response = parkingSpaceService.searchSummaries(lat, lon);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingSpaceDetailDTO> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(parkingSpaceService.getDetails(id));
    }
}