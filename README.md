# 🌐 Omni-Engage 

An Omni-channel customer engagement system built with a modern **microservices architecture** using **Spring Boot** and **React**.

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-blue.svg?logo=java&logoColor=white" alt="Java 17">
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-brightgreen.svg?logo=spring&logoColor=white" alt="Spring Boot 3.x">
  <img src="https://img.shields.io/badge/React-18-blue.svg?logo=react&logoColor=white" alt="React 18">
  <img src="https://img.shields.io/badge/MySQL-8-orange.svg?logo=mysql&logoColor=white" alt="MySQL 8">
  <img src="https://img.shields.io/badge/Docker-Active-blue.svg?logo=docker&logoColor=white" alt="Docker">
</p>

---

**Omni-Engage** is a  **Omni-channel engagement platform** that enables agents to manage customer conversations seamlessly across Email, Facebook, Twitter, Instagram, WhatsApp, and more.

---

## 📚 Table of Contents

- [🧩 System Architecture](#-system-architecture)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Tech Stack](#️-tech-stack)
- [🧠 Features](#-features)
- [☁️ Future Enhancements](#-future-enhancements)
- [🧑‍💼 Author](#-author)

---

## 🧩 System Architecture

The platform consists of **independent microservices** communicating via REST APIs.

| Component | Description | Technology | Port |
|------------|--------------|-------------|------|
| 🧑‍💻 **Agent Service** | Manages agents, conversations, and messages | Spring Boot | `8081` |
| 📥 **Ingestion Service** | Handles inbound data from multiple channels | Spring Boot | `8080` |
| 💬 **Agent Dashboard** | Web UI for agents to manage chats | React | `3000` |
| 🗄️ **MySQL Database** | Stores all relational data | MySQL | `3307` |

---

## 🚀 Getting Started

Follow these steps to get the project running locally.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Docker Engine must be **running**

---

### 🐳 Run Using Docker (Recommended)

The easiest way to spin up the entire stack.

```bash
# Clone the repository
git clone https://github.com/Pranjali784/omni-engage.git
cd omni-engage

# Copy example env file
cp .env.example .env

# Build and run containers
docker compose up -d --build
```

Once all services are up, you can access:

| Service | URL |
|----------|-----|
| 💬 **Frontend** | [http://localhost:3000](http://localhost:3000) |
| 🧑‍💻 **Agent API** | [http://localhost:8081](http://localhost:8081) |
| 📥 **Ingestion API** | [http://localhost:8080](http://localhost:8080) |
| ❤️ **Health (Agent)** | [http://localhost:8081/actuator/health](http://localhost:8081/actuator/health) |
| ❤️ **Health (Ingestion)** | [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) |

**Stop all services:**
```bash
docker compose down
```

**Stop + remove DB volume (clear data):**
```bash
docker compose down -v
```

---

<details>
<summary>💻 Run Locally (Without Docker)</summary>

### 1️⃣ Agent Service
```bash
cd agent-service
cp src/main/resources/application-example.properties src/main/resources/application.properties
./mvnw spring-boot:run
```

### 2️⃣ Ingestion Service
```bash
cd ingestion-service
cp src/main/resources/application-example.properties src/main/resources/application.properties
./mvnw spring-boot:run
```

### 3️⃣ Agent Dashboard (Frontend)
```bash
cd agent-dashboard
npm install
npm start
```

### 4️⃣ MySQL Configuration
```text
Database: omni_engage
User: omni
Password: omni123
```
</details>

---

## ⚙️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Backend** | Java 17 · Spring Boot 3.x · JPA/Hibernate · Maven |
| **Frontend** | React 18 · Axios · npm |
| **Database** | MySQL 8 |
| **DevOps / Tools** | Docker Compose · GitHub |

---

## 🧠 Features

✅ Agent management (status, availability)  
✅ Create / Close / Reopen conversations  
✅ Message history per channel  
✅ Filter by agent, channel, or status  
✅ Real-time updates (polling every 10 s)  
✅ Actuator health monitoring  
✅ Fully containerized setup for easy deployment  

---

## ☁️ Future Enhancements

- [ ] Deploy on **AWS ECS / EKS**
- [ ] Add **Redis caching**
- [ ] Integrate **JWT Authentication**
- [ ] Implement **WebSockets** for live chat
- [ ] Add **CI/CD with GitHub Actions**

---

## 🧑‍💼 Author

**Pranjali Srivastava**  
*Java Developer | Full-Stack Enthusiast*  
📍 Chennai, India  

<p align="center">
  <a href="https://www.linkedin.com/in/pranjali784/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Pranjali%20Srivastava-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

---

> 🐳 *This project demonstrates modern microservice development and deployment practices using Spring Boot, React, MySQL, and Docker.*


