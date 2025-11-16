# NestHome — Full-Stack Home Services Platform (Frontend + Backend) 🏡✨

A concise overview of NestHome, a full-stack application with a Spring Boot backend and a modern React frontend for role-based home services management (Admin, User, Professional).

## Features 🚀

  - **Secure Authentication & Authorization:** Role-based access control for Admin, User, and Professional.
  - **Session-Based Login:** Uses `JSESSIONID` for stateful sessions, with an easy path to switch to JWT if needed.
  - **Admin Dashboard:** 👑 Manage users, assign roles, create services, and view key dashboard statistics.
  - **Professional Registration:** 💼 Professionals can register and specify their services.
  - **User Service Requests:** 🧑‍🤝‍ Browse and request home services through an intuitive frontend.
  - **Robust RESTful APIs:** 🛠️ Built with validation and structured error handling.
  - **CORS Configuration:** 🌐 Ready for local frontend development.

## Tech Stack 💻

  - **Frontend:** React (Vite/CRA), Axios, React Router, CSS/Component Library
  - **Backend:** Spring Boot 3, Spring Security, Spring Data JPA, Hibernate
  - **Database:** MySQL (H2 for development/testing)
  - **Build/Tools:** Maven, Lombok, Spring DevTools
  - **API Docs (Optional):** springdoc OpenAPI/Swagger

## Monorepo Structure 📂

```
/frontend
  ├── src/                     # React app source
  ├── public/
  ├── package.json
  └── .env                     # VITE_API_URL=http://localhost:8080

/backend
  ├── src/main/java/com/nesthome
  │   ├── NestHomeV1Application.java
  │   ├── config/              # Security, CORS
  │   ├── controller/          # REST controllers
  │   ├── entity/              # User, Role, Service
  │   ├── repository/          # Spring Data JPA
  │   └── service/             # Business logic
  ├── src/main/resources/application.properties
  ├── pom.xml
  └── mvnw, mvnw.cmd
```

## Backend — Quick Start ⚙️

1.  **Configure Database:** Edit `backend/src/main/resources/application.properties` with your MySQL credentials:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/nesthome_db
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    ```

2.  **Build and Run:** Navigate to the backend directory and execute:

    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```

3.  **API Base URL:** `http://localhost:8080`

### Security & Roles 🛡️

  - **Public Endpoints:** `/api/auth/register`, `/api/auth/login`, `/api/home/**`
  - **Admin Endpoints:** `/api/admin/**`
      - `GET /api/admin/users` — List all users
      - `POST /api/admin/assign-role` — Assign a role to a user
      - `DELETE /api/admin/delete` — Delete a user
      - `POST /api/admin/createservice` — Add a new service
      - `GET /api/admin/dashboard-stats` — Get user and professional counts
  - **User/Professional:** Dedicated endpoints under `/api/user/**` and `/api/professional/**`.
  - **Sessions:** `HttpSession` with `JSESSIONID` cookie and `remember-me` enabled.
  - **CORS:** Configured to allow `http://localhost:3000` with credentials.

> **Note:** Ensure BCrypt for passwords and consistent role names (`ROLE_ADMIN`, `ROLE_USER`, `ROLE_PROFESSIONAL`).

## Frontend — Quick Start 🖥️

1.  **Configure Environment:** Ensure your `frontend/.env` file points to the backend:

    ```properties
    VITE_API_URL=http://localhost:8080
    ```

2.  **Install and Run:**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3.  **Typical Flows:**

      - **Register/Login:** Make `POST` requests to `${VITE_API_URL}/api/auth/register` and `/api/auth/login`.
      - **Session Handling:** Store sessions via cookies using `withCredentials: true` in Axios.

    **Axios Example:**

    ``` js
    const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true
    });
    ```

## Development Tips 💡

  - **Credentials:** Enable `withCredentials` in all frontend requests.
  - **Production Security:** For production, enforce HTTPS and set `secure`, `HttpOnly`, and `SameSite` cookie attributes.
  - **Swagger:** Add the `springdoc-openapi-starter-webmvc-ui` dependency for API documentation at `/swagger-ui.html`.

## Scripts 📜

  - **Frontend:**
      - `npm run dev` — Start the development server.
      - `npm run build` — Create a production build.
  - **Backend:**
      - `./mvnw clean install` — Build the project.
      - `./mvnw spring-boot:run` — Run the Spring Boot service.

## Roadmap 🗺️

  - **JWT Migration:** Transition to a stateless JWT-based authentication system.
  - **Secure Tokens:** Implement refresh tokens or short-lived sessions for enhanced security.
  - **2FA:** Add Two-Factor Authentication for Admin accounts.
  - **Deployment:** Containerize with Docker and deploy to cloud platforms like AWS or GCP.
  - **Role-Aware UI:** Dynamically render frontend components based on user roles.
  - **Improved Validation:** Enhance UI and API validation for a better user experience.
