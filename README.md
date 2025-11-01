🚗 ParkEase

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

ParkEase is a full-stack web application that allows users to find and share private parking spots. Owners can list their available driveways or spots for specific times, and drivers can search for parking in real-time on an interactive map.

📚 Table of Contents

🏛️ Project Structure

🚀 Getting Started

⚙️ Tech Stack

🧠 Core Features

☁️ Future Enhancements

🧑‍💼 Author

🏛️ Project Structure

The platform consists of three main components, containerized to run together in a monorepo structure.

Component

Description

Technology

Port (Docker)

🖥️ parkease-frontend

The complete React UI with interactive maps and user forms.

React 18, Nginx

5190

⚙️ parkease-backend

RESTful API for users, spots, search, and authentication.

Spring Boot 3

8080

🗄️ parkease-db

Persistent storage for all user and parking data.

MySQL 8

3307

🚀 Getting Started

Follow these steps to get the project running locally.

Prerequisites

Docker Desktop

Docker Engine must be running

🐳 Run Using Docker (Recommended)

The easiest way to spin up the entire stack.

# 1. Clone the repository
git clone [https://github.com/Pranjali784/ParkEase_Pro.git](https://github.com/Pranjali784/ParkEase_Pro.git)
cd ParkEase_Pro

# 2. Copy the example .env file
# (This file contains all the secrets for Docker)
cp .env.example .env

# 3. Edit the .env file with your secrets
# You must fill in all values marked with YOUR_...
# (e.g., GOOGLE_CLIENT_ID, RADAR_SECRET_KEY, etc.)
# nano .env  (or open in your editor)

# 4. Build and run all containers
docker-compose up --build


Once all services are up, you can access:

Service

URL

🚗 ParkEase App

http://localhost:5190

⚙️ Backend API

http://localhost:5190/api (Proxied by Nginx)

IMPORTANT: Add Test Data
The first time you run this, the database will be empty. Use MySQL Workbench (or your favorite DB tool) to connect to the Docker database on port 3307 and run the script found in parkease-api/src/main/resources/data.sql to add test users and parking spots.

Database Connection Details (for Workbench):

Hostname: 127.0.0.1

Port: 3307

Username: parkease_user (or your value from .env)

Password: The MYSQL_PASSWORD you set in .env

Default Schema: parkease_db

Stop all services:

docker-compose down


Stop + remove database (clear all data):

docker-compose down -v


<details>
<summary>💻 Run Locally (Manual Setup without Docker)</summary>

1️⃣ Database Setup

Ensure you have a local MySQL 8 instance running on port 3306.

Manually create a database named parkease_db.

Manually run the data.sql script to create test users and spots.

2️⃣ Backend API (parkease-api)

# Navigate to the backend folder
cd parkease-api

# Create your secret properties file
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Edit application.properties and fill in your secrets
nano src/main/resources/application.properties

# Run the app
./mvnw spring-boot:run


The backend will be running on http://localhost:8080.

3️⃣ Frontend App (parkease-frontend)

# Navigate to the frontend folder
cd parkease-frontend

# Create your local .env file (copy from the root example)
cp ../.env.example .env.local

# Edit .env.local (You only need the VITE_... keys)
nano .env.local

# Install dependencies
npm install

# Run the dev server (must be on port 5190)
npm run dev


The frontend will be available at http://localhost:5190.

</details>

⚙️ Tech Stack

Category

Technologies

Backend

Java 17 · Spring Boot 3 · Spring Security 6 (JWT) · JPA/Hibernate · Maven

Frontend

React 18 · React Router · Vite · TailwindCSS

Database

MySQL 8

Authentication

Manual (Email/Password) · Google OAuth 2.0 (via google-api-client)

Geocoding

Radar API (Search, Autocomplete, Maps)

DevOps / Tools

Docker · Docker Compose · Nginx · Git

🧠 Core Features

✅ Full-Stack Authentication: Secure user registration and login with both manual credentials and Google OAuth 2.0.

✅ JWT Security: All private API routes are protected using JSON Web Tokens, ensuring a stateless and secure backend.

✅ Real-Time Map Search: Find nearby parking spots within a 15km radius on an interactive map.

✅ Place & Address Autocomplete: Uses Radar API for smart address/place search on both search and "Add Park" forms.

✅ Add Parking: Authenticated users can list their own parking spots, pinning them to an exact location with available times and vehicle types.

✅ User Profiles: A dedicated page for users to view their account details and a list of all parking spots they've added.

✅ Marker Jittering: Automatically "jitters" (offsets) map markers at the same coordinates to prevent them from stacking and hiding.

✅ Fully Containerized: The entire stack (DB, Backend, Frontend) runs with a single docker-compose up command for easy setup.

☁️ Future Enhancements

[ ] Implement a full booking and reservation system.

[ ] Add payment integration using Stripe or Razorpay.

[ ] Add user-to-user chat for drivers and spot owners.

[ ] Deploy the entire application to a cloud provider like AWS or Azure.

LAuthor

Pranjali Srivastava Java Developer | Full-Stack Enthusiast 📍 Chennai, India

<p align="center">
<a href="https://www.linkedin.com/in/pranjali784/" target="_blank">
<img src="https://img.shields.io/badge/LinkedIn-Pranjali%20Srivastava-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
</p>

🐳 This project demonstrates a modern full-stack approach to solving real-world urban parking challenges using Spring Boot, React, MySQL, and Docker.
