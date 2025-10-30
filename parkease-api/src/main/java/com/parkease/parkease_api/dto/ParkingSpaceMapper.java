package com.parkease.parkease_api.dto;

import com.parkease.parkease_api.model.ParkingSpace;
import com.parkease.parkease_api.model.User;

public final class  ParkingSpaceMapper {

    private ParkingSpaceMapper() {}

    public static ParkingSpaceSummaryDTO toSummary(ParkingSpace ps) {
        // This was missing ps.getModelType()
        return new ParkingSpaceSummaryDTO(
                ps.getId(),
                ps.getAddress(),
                ps.getLatitude(),
                ps.getLongitude(),
                ps.getVehicleTypes(),
                ps.getModelType(), // <-- THE FIX
                ps.getCapacity(),
                ps.getAvailableFrom(),
                ps.getAvailableTo()
        );
    }

    public static ParkingSpaceDetailDTO toDetail(ParkingSpace ps) {
        User owner = ps.getOwner();
        String ownerName = owner != null ? owner.getName() : null;
        String ownerContact = owner != null ? owner.getEmail() : null;

        // This was also missing ps.getModelType()
        return new ParkingSpaceDetailDTO(
                ps.getId(),
                ps.getAddress(),
                ps.getLatitude(),
                ps.getLongitude(),
                ps.getVehicleTypes(),
                ps.getModelType(), // <-- THE FIX
                ps.getCapacity(),
                ps.getAvailableFrom(),
                ps.getAvailableTo(),
                ps.getNotes(),
                ownerName,
                ownerContact
        );
    }
}