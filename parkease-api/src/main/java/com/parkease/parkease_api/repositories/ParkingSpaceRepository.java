package com.parkease.parkease_api.repositories;

import com.parkease.parkease_api.model.ParkingSpace;
import com.parkease.parkease_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParkingSpaceRepository extends JpaRepository<ParkingSpace, Long> {

    @Query("""
        SELECT ps FROM ParkingSpace ps
        WHERE (6371 * acos(
            cos(radians(:centerLat)) * cos(radians(ps.latitude)) *
            cos(radians(ps.longitude) - radians(:centerLon)) +
            sin(radians(:centerLat)) * sin(radians(ps.latitude))
        )) <= :radiusKm
    """)
    List<ParkingSpace> findSpacesNearby(
            @Param("centerLat") double centerLat,
            @Param("centerLon") double centerLon,
            @Param("radiusKm") double radiusKm
    );

    List<ParkingSpace> findByOwner(User owner);
}
