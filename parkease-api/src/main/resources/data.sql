-- =====================================================
-- 1️⃣ USERS (NO ROLE COLUMN)
-- =====================================================

INSERT INTO users (id, name, email, password)
VALUES
(
  1,
  'System Admin',
  'admin@parkease.com',
  '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5z4j7N9v1p6qP4U0w8Z8p9y0K'
)
ON DUPLICATE KEY UPDATE id = id;

-- =====================================================
-- 2️⃣ TAMBARAM STATION – 50 SPOTS
-- =====================================================

INSERT INTO parking_spaces
(address, latitude, longitude, vehicle_types, model_type, capacity, available_from, available_to, owner_id)
SELECT
  CONCAT('Tambaram Station Parking ', seq),
  12.9250 + (seq * 0.00008),
  80.1270 + (seq * 0.00008),
  'Car,Bike',
  NULL,
  3,
  '06:00',
  '22:00',
  1
FROM (
  SELECT @row := @row + 1 AS seq
  FROM information_schema.columns, (SELECT @row := 0) r
  LIMIT 50
) t;

-- =====================================================
-- 3️⃣ GUDUVANCHERI STATION – 50 SPOTS
-- =====================================================

INSERT INTO parking_spaces
(address, latitude, longitude, vehicle_types, model_type, capacity, available_from, available_to, owner_id)
SELECT
  CONCAT('Guduvancheri Station Parking ', seq),
  12.8455 + (seq * 0.00008),
  80.0615 + (seq * 0.00008),
  'Car,Bike',
  NULL,
  3,
  '06:00',
  '22:00',
  1
FROM (
  SELECT @row2 := @row2 + 1 AS seq
  FROM information_schema.columns, (SELECT @row2 := 0) r
  LIMIT 50
) t;
