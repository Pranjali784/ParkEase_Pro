🚗 ParkEase

ParkEase is a real-time, location-aware parking management platform designed to connect private parking space owners with drivers seeking nearby parking.

It is developed using a modern full-stack architecture based on Spring Boot and React, emphasizing scalability, security, and usability.

<p align="center">
<img src="https://img.shields.io/badge/Java-17-blue.svg?logo=java&logoColor=white" alt="Java 17">
<img src="https://img.shields.io/badge/Spring_Boot-3.x-brightgreen.svg?logo=spring&logoColor=white" alt="Spring Boot 3.x">
<img src="https://img.shields.io/badge/Spring_Security-6.x-blueviolet.svg?logo=springsecurity&logoColor=white" alt="Spring Security 6.x">
<img src="https://img.shields.io/badge/React-18-blue.svg?logo=react&logoColor=white" alt="React 18">
<img src="https://img.shields.io/badge/MySQL-8-orange.svg?logo=mysql&logoColor=white" alt="MySQL 8">
<img src="https://img.shields.io/badge/Radar-API-007AFF.svg?logo=radar&logoColor=white" alt="Radar API">
<img src="https://img.shields.io/badge/Docker-Ready-blue.svg?logo=docker&logoColor=white" alt="Docker Ready">
</p>

📘 Overview

ParkEase enables two user roles:

Owners: List their available private parking spaces with location and availability details.

Drivers: Search and reserve nearby parking spots in real-time via an interactive map powered by Radar API.

📂 Project Structure

The project follows a three-tier containerized architecture, managed through Docker Compose for seamless orchestration and local development.

Component

Description

Technology Stack

Docker Port

Frontend (parkease-frontend)

Responsive web application with interactive maps and forms.

React 18, Nginx

5190

Backend (parkease-backend)

RESTful API handling user authentication, data management, and search.

Spring Boot 3, Spring Security (JWT)

8080

Database (parkease-db)

Persistent relational database for user and parking data.

MySQL 8

3307

🚀 Getting Started

Prerequisites

Docker Desktop installed and running.

Option 1: Run Using Docker (Recommended)

# 1. Clone the repository
git clone [https://github.com/Pranjali784/ParkEase_Pro.git](https://github.com/Pranjali784/ParkEase_Pro.git)
cd ParkEase_Pro

# 2. Copy the example environment file
cp .env.example .env

# 3. Update secrets in the .env file
# (e.g., GOOGLE_CLIENT_ID, RADAR_SECRET_KEY, MYSQL_PASSWORD)
nano .env

# 4. Build and start all services
docker-compose up --build


Once started, the following services will be available:

Service

URL

Frontend Application

http://localhost:5190

Backend API (via Nginx proxy)

http://localhost:5190/api

Database Initialization

The initial database is empty. To populate it with test data:

Open MySQL Workbench or any SQL client.

Connect using the following details:

Hostname: 127.0.0.1

Port: 3307

Username: parkease_user (as per .env)

Password: The MYSQL_PASSWORD from .env

Schema: parkease_db

Run the SQL script located at: parkease-api/src/main/resources/data.sql

Stopping Services

# Stop all running containers
docker-compose down

# Stop and remove database volumes (clears data)
docker-compose down -v


Option 2: Manual Local Setup (Without Docker)

<details>
<summary>Expand for manual setup instructions</summary>

1️⃣ Database Setup

Install MySQL 8 locally (default port: 3306).

Create a database named parkease_db.

Execute data.sql to populate sample users and parking data.

2️⃣ Backend Setup

cd parkease-api
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Fill in DB credentials and API keys in application.properties
./mvnw spring-boot:run


Backend will be available at: http://localhost:8080

3️⃣ Frontend Setup

cd parkease-frontend
cp ../.env.example .env.local
# Add environment variables (VITE_...) to .env.local
npm install
npm run dev


Frontend will run at: http://localhost:5190

</details>

⚙️ Tech Stack

Category

Technologies

Backend

Java 17 · Spring Boot 3 · Spring Security (JWT) · Hibernate · Maven

Frontend

React 18 · React Router · Vite · TailwindCSS

Database

MySQL 8

Authentication

Email/Password · Google OAuth 2.0

Geocoding

Radar API (Search, Autocomplete, Maps)

DevOps / Tools

Docker · Docker Compose · Nginx · Git

💡 Core Features

✅ User Authentication: Secure manual login (email/password) and Google OAuth 2.0 support.

✅ Secure Authorization: Stateless JWT-based security layer for protected API endpoints.

✅ Real-Time Map Search: Locate nearby parking spots within a configurable radius.

✅ Smart Autocomplete: Radar-powered address and place search for an enhanced user experience.

✅ Parking Management: Authenticated users can list, edit, and manage their private parking availability.

✅ User Profiles: Personalized dashboard for users to view their added spots and account details.

✅ Map Optimization: Marker "jittering" to prevent multiple spots at the same coordinate from overlapping.

✅ Containerized Deployment: Single-command startup for all services (frontend, backend, DB) via Docker Compose.

🔮 Future Enhancements

[ ] Implement a full booking and reservation module.

[ ] Add payment gateway integration (Stripe / Razorpay).

[ ] Implement real-time chat between spot owners and drivers.

[ ] Deploy the application to AWS / Azure for production readiness.

👩‍💻 Author

Pranjali Srivastava
Java Developer | Full-Stack Engineer
📍 Chennai, India

<p align="center">
<a href="https://www.linkedin.com/in/pranjali784/" target="_blank">
<img src="https://img.shields.io/badge/LinkedIn-Pranjali%20Srivastava-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
</p>

📄 License

This project is licensed under the MIT License — feel free to modify and extend it for learning or development purposes.

🏁 Summary

ParkEase showcases a modern full-stack approach to solving real-world urban parking challenges using Spring Boot, React, MySQL, and Docker. Its modular structure, secure authentication flow, and real-time map features make it a strong example of scalable full-stack system design.
