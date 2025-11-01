# 🚗 ParkEase

A real-time, location-aware parking sharing platform built with a modern full-stack architecture using Spring Boot and React.

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-blue.svg?logo=java&logoColor=white" alt="Java 17">
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-brightgreen.svg?logo=spring&logoColor=white" alt="Spring Boot 3.x">
  <img src="https://img.shields.io/badge/Spring_Security-6.x-blueviolet.svg?logo=springsecurity&logoColor=white" alt="Spring Security 6.x">
  <img src="https://img.shields.io/badge/React-18-blue.svg?logo=react&logoColor=white" alt="React 18">
  <img src="https://img.shields.io/badge/MySQL-8-orange.svg?logo=mysql&logoColor=white" alt="MySQL 8">
  <img src="https://img.shields.io/badge/Radar-API-007AFF.svg?logo=radar&logoColor=white" alt="Radar API">
  <img src="https://img.shields.io/badge/Docker-Ready-blue.svg?logo=docker&logoColor=white" alt="Docker Ready">
</p>

ParkEase is a full-stack web application that enables users to find and share private parking spaces. Owners can list their available driveways or parking spots for specific times, while drivers can search and book in real time using an interactive map interface.

## 📚 Table of Contents

- [🏗️ System Architecture](#️-system-architecture)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Tech Stack](#️-tech-stack)
- [🧠 Core Features](#-core-features)
- [☁️ Future Enhancements](#️-future-enhancements)
- [🧑‍💼 Author](#️-author)

## 🏗️ System Architecture

The platform consists of three main components, each containerized and orchestrated via Docker Compose.

| Component | Description | Technology | Port |
|-----------|-------------|------------|------|
| 🖥️ parkease-frontend | Interactive React UI for search, listings, and map view | React 18 · Vite · TailwindCSS | 5190 |
| ⚙️ parkease-backend | RESTful APIs for authentication, users, and parking management | Spring Boot 3 · JPA/Hibernate | 8080 |
| 🗄️ parkease-db | Persistent data storage for users and parking info | MySQL 8 | 3307 |

## 🚀 Getting Started

Follow these steps to get the project running locally.

### Prerequisites

- Docker Desktop
- Docker Engine must be running

### 🐳 Run Using Docker (Recommended)

The easiest way to spin up the entire stack.

```bash
# Clone the repository
git clone https://github.com/Pranjali784/ParkEase_Pro.git
cd ParkEase_Pro

# Copy the example environment file
cp .env.example .env

# Edit .env with your own secrets
# (GOOGLE_CLIENT_ID, RADAR_SECRET_KEY, MYSQL_PASSWORD, etc.)

# Build and start all services
docker compose up --build
```

Once all services are up, you can access:

| Service | URL |
|---------|-----|
| 🚗 ParkEase App (Frontend) | http://localhost:5190 |
| ⚙️ Backend API (via Nginx Proxy) | http://localhost:5190/api |

### 🧩 Add Test Data

By default, the database starts empty. Use MySQL Workbench (or any SQL client) to connect and run the seed data script:

**Connection Details**

- Hostname: `127.0.0.1`
- Port: `3307`
- Username: `parkease_user`
- Password: `<from .env>`
- Default Schema: `parkease_db`

Run SQL from:

```
parkease-api/src/main/resources/data.sql
```

Stop all services:

```bash
docker compose down
```

Stop + remove database volume (clear all data):

```bash
docker compose down -v
```

<details>
<summary>💻 Run Locally (Without Docker)</summary>

### 1️⃣ Database Setup

```sql
# Create Database
CREATE DATABASE parkease_db;
```

Run the script `data.sql` manually to create test users and spots.

### 2️⃣ Backend API

```bash
cd parkease-api
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Update your DB credentials and API keys
./mvnw spring-boot:run
```

Backend will run at http://localhost:8080

### 3️⃣ Frontend

```bash
cd parkease-frontend
cp ../.env.example .env.local
npm install
npm run dev
```

Frontend will run at http://localhost:5190

</details>

## ⚙️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Backend | Java 17 · Spring Boot 3 · Spring Security 6 (JWT) · Hibernate · Maven |
| Frontend | React 18 · Vite · TailwindCSS · React Router |
| Database | MySQL 8 |
| Authentication | Email/Password · Google OAuth 2.0 |
| Geocoding / Maps | Radar API (Autocomplete, Reverse Geocode, Map Search) |
| DevOps / Tools | Docker · Docker Compose · Nginx · Git |

## 🧠 Core Features

- ✅ **User Authentication** — Secure login via email/password or Google OAuth 2.0
- ✅ **JWT Security** — All private routes protected via token-based auth
- ✅ **Interactive Map Search** — Find nearby parking within 15 km radius
- ✅ **Smart Autocomplete** — Radar API for addresses and location suggestions
- ✅ **Add Parking Spots** — List driveways with location, availability, and vehicle type
- ✅ **User Profiles** — View added listings and personal info
- ✅ **Marker Jittering** — Prevent overlapping pins on identical coordinates
- ✅ **Fully Containerized** — One command deployment via Docker Compose

## ☁️ Future Enhancements

- [ ] Implement booking and reservation workflow
- [ ] Integrate payments (Stripe / Razorpay)
- [ ] Enable user-to-user chat between drivers and owners
- [ ] Deploy to AWS / Azure Cloud
- [ ] Add real-time notifications for booking status

## 🧑‍💼 Author

**Pranjali Srivastava**  
Java Developer | Full-Stack Enthusiast  
📍 Chennai, India

<p align="center">
  <a href="https://www.linkedin.com/in/pranjali784/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Pranjali%20Srivastava-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

---

🐳 This project demonstrates a modern full-stack solution to urban parking challenges using Spring Boot, React, MySQL, and Docker.
