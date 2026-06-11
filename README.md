# 🍌 Banana Nexus Game

A full-stack web-based number guessing game where players solve image-based banana puzzles to earn points and climb the leaderboard!

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Database Setup](#1-database-setup)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [How to Play](#how-to-play)
- [API Endpoints](#api-endpoints)
- [Player Levels](#player-levels)
- [Environment Configuration](#environment-configuration)

---

## 🎮 About the Project

**Banana Nexus Game** is an exciting web-based quiz game powered by the [Banana API](http://marcconrad.com/uob/banana/api.php). Players are shown a banana-themed image puzzle and must guess the correct number hidden within it.

- ✅ Register & Login with secure JWT-based authentication
- 🍌 Get a new banana puzzle image for every question
- ⏱️ 60-second countdown timer per game session
- 🏆 Earn points and level up (Silver → Platinum → Gold)
- 📊 View the global leaderboard (Point Table)

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 11 | Programming Language |
| Spring Boot | 2.4.3 | Application Framework |
| Spring Security + OAuth2 | - | JWT Authentication |
| Spring Data JPA / Hibernate | - | Database ORM |
| MySQL | 5.x / 8.x | Relational Database |
| Maven | 3.x | Build Tool |
| Lombok | - | Boilerplate Reduction |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI Framework |
| React Router DOM | 6.9.0 | Client-side Routing |
| Axios | 1.3.4 | HTTP Client |
| Bootstrap + React-Bootstrap | 5.2.3 | UI Styling |
| React-Toastify | 11.x | Toast Notifications |
| Animate.css | 4.1.1 | Animations |

---

## 📁 Project Structure

```
banana-nexus-game/
│
├── banana-game/                        # ☕ Spring Boot Backend
│   ├── src/main/java/com/banananexusgame/bananagame/
│   │   ├── config/                     # Security, Beans, Throttling
│   │   ├── controller/                 # REST Controllers
│   │   │   ├── AppController/          # GET /application/version
│   │   │   └── PlayerController/       # Player & Game endpoints
│   │   ├── dto/                        # Request/Response DTOs
│   │   ├── entity/                     # JPA Entities (Player, Score, ScoreDetail)
│   │   ├── enums/                      # Enums (Level, ActiveStatus, etc.)
│   │   ├── exception/                  # Custom Exception Handling
│   │   ├── repository/                 # Spring Data JPA Repositories
│   │   ├── service/                    # Service Interfaces & Implementations
│   │   └── utilities/                  # SmileyAPI, EmailSender, etc.
│   └── src/main/resources/
│       ├── application.properties      # Common config (active profile: local)
│       ├── application-local.properties
│       ├── application-dev.properties
│       └── application-prod.properties
│
└── banananexus-game-frontend/          # ⚛️ React Frontend
    └── src/
        ├── assets/                     # Images
        ├── components/                 # NavBar, Banner, SignUp, AuthContext
        └── pages/
            ├── auth/                   # Login & Register Page
            ├── quiz/                   # Game Play Page
            ├── game-over/              # Game Over Page
            ├── point-table/            # Leaderboard Page
            └── verification/          # Email Verification Page
```

---

## ✅ Prerequisites

Make sure the following are installed on your machine:

- **Java JDK 11+** → [Download](https://www.oracle.com/java/technologies/downloads/)
- **Apache Maven 3.6+** → [Download](https://maven.apache.org/download.cgi)
- **Node.js 16+** & **npm** → [Download](https://nodejs.org/)
- **MySQL Server 5.7+ or 8.x** → [Download](https://dev.mysql.com/downloads/)

---

## 🚀 Getting Started

### 1. Database Setup

1. Start your **MySQL Server** (via XAMPP, MySQL Workbench, or service).
2. The database `simple_game` will be **auto-created** on first run.
3. Open `banana-game/src/main/resources/application-local.properties` and verify:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/simple_game?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=1234      # ← Change this to your MySQL password
```

---

### 2. Backend Setup

Open a terminal, navigate to the backend directory, and run:

```bash
cd banana-game
```

**Windows (PowerShell):**
```powershell
# Set JAVA_HOME if not set globally
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"

# Run the Spring Boot app
mvn spring-boot:run "-Dspring-boot.run.fork=false"
```

**macOS / Linux:**
```bash
./mvnw spring-boot:run
```

> ✅ Backend will start at: **http://localhost:8080**  
> Context path: `/api`, API prefix: `/v1`

---

### 3. Frontend Setup

Open a **new terminal**, navigate to the frontend directory, and run:

```bash
cd banananexus-game-frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

> ✅ Frontend will open automatically at: **http://localhost:3000**

---

## 🎮 How to Play

1. **Sign Up** – Create an account with a username, email, and password.
2. **Sign In** – Login with your username and password.
3. **Start Game** – Click "Start Game" on the home page.
4. **Guess the Number** – An image puzzle is shown. Type your answer and click **Guess**.
   - ✅ Correct → +10 points, next puzzle loads immediately.
   - ❌ Wrong → No points, next puzzle loads.
5. **Timer** – You have **60 seconds** per game session.
6. **Game Over** – View your total points, start a new game, or check the **Point Table**.

---

## 📡 API Endpoints

Base URL: `http://localhost:8080/api/v1`

### Authentication (OAuth2)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/oauth/token` | Login & get JWT token (client: `player`, grant: `password`) |

### Player
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/player/signup` | ❌ | Register a new player |
| `PATCH` | `/player/account/verify?token=...` | ❌ | Verify email account |
| `POST` | `/player/game/start` | ✅ Bearer | Start a game session |

### Game
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/game/start` | ✅ Bearer | Start a game, get first question |
| `POST` | `/game/answer/check` | ✅ Bearer | Submit answer, get next question |
| `POST` | `/game/end` | ✅ Bearer | End the game session |
| `GET`  | `/game/top-score` | ✅ Bearer | Get leaderboard scores |

### Application
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET`  | `/application/version` | ❌ | Get current API version |

---

## 🏅 Player Levels

Players level up based on cumulative correct answers:

| Level | Threshold |
|-------|-----------|
| 🥈 Silver | Starting level |
| 💎 Platinum | 1,000+ total points |
| 🥇 Gold | 10,000+ total points |

Each correct answer awards **+10 points** to both the game session score and the player's overall level score.

---

## ⚙️ Environment Configuration

The active Spring profile is set in `application.properties`:

```properties
spring.profiles.active=local
```

| Profile | File | Usage |
|---------|------|-------|
| `local` | `application-local.properties` | Local development |
| `dev` | `application-dev.properties` | Development server |
| `prod` | `application-prod.properties` | Production server |

---

## 🔐 OAuth2 Client Credentials

| Client | Client ID | Secret | Token Validity |
|--------|-----------|--------|----------------|
| Player | `player` | *(empty)* | 1 day access / 90 days refresh |
| Admin  | `admin`  | *(empty)* | 1 day access / 90 days refresh |

**Base64 encoded Authorization header for player login:**
```
Authorization: Basic cGxheWVyOg==
```

---

## 👨‍💻 Author

**Hashitha Danidu**  
Banana Nexus Game — Built with  using Spring Boot & React 