-- This file adds test users and parking spots.
-- It will only run if the database is new or if `spring.jpa.hibernate.ddl-auto` is `create` or `create-drop`.
-- Since yours is `update`, you may need to run this manually in your MySQL client (like MySQL Workbench) one time.

-- 1. Create new owners for the spots
-- The password for both users is 'password123' (BCrypt hashed)
INSERT IGNORE INTO users (id, name, email, password) VALUES
(2, 'Spot Owner One', 'owner1@park.com', '$2a$10$w.p84iL/aD.8jR2Rxa.Gf.t3i.qnaXgCnm2E5sYkC1L.5e2.sB9m2'),
(3, 'Spot Owner Two', 'owner2@park.com', '$2a$10$w.p84iL/aD.8jR2Rxa.Gf.t3i.qnaXgCnm2E5sYkC1L.5e2.sB9m2');


-- 2. Add new parking spots in Tambaram
-- NOTE: We are setting capacity=1 and modelType for all new spots.
INSERT IGNORE INTO parking_spaces (id, owner_id, address, latitude, longitude, vehicle_types, model_type, capacity, available_from, available_to, notes) VALUES
(
    101, 2, 'Tambaram Railway Station, Chennai, IN',
    12.9248, 80.1130, 'Car', 'Sedan', 1, '08:00:00', '20:00:00', 'Near the main entrance'
),
(
    102, 3, 'Madras Christian College, Tambaram, IN',
    12.9213, 80.1196, 'Bike', 'Motorcycle', 2, '07:00:00', '19:00:00', 'Beside the library'
),
(
    103, 2, '5, Velachery Main Rd, Tambaram, Chennai, IN',
    12.9270, 80.1345, 'Car', 'SUV', 1, '10:00:00', '22:00:00', 'Private driveway'
);