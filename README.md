# Project Management App

A full-stack project management application built with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, and a modern **Next.js** frontend. This app allows teams to manage projects, tasks, users, and teams with secure JWT authentication.

---

## Features

- **User Authentication:** Secure signup and login using JWT (JSON Web Tokens)
- **Project Management:** Create, update, and view projects
- **Task Management:** Assign, update, and track tasks
- **Team Management:** Organize users into teams
- **User Profiles:** View and update user information
- **Search:** Search for projects, tasks, and users
- **RESTful API:** Well-structured backend endpoints
- **Secure:** Uses bcrypt for password hashing and JWT for authentication
- **Modern UI:** Responsive and interactive frontend

---

## Tech Stack

### Frontend

- **Framework:** Next.js (React-based, server-side rendering)
- **State Management:** Redux Toolkit & RTK Query
- **Styling:** Tailwind CSS, MIUI (Material-UI)
- **Charts:** Recharts for data visualization
- **Language:** TypeScript

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** Helmet, CORS, Morgan, dotenv

---

## Frontend Details

- **Framework:** Next.js with TypeScript for SSR and SSG
- **State Management:** Redux Toolkit for global state, RTK Query for efficient API data fetching and caching
- **Styling:** Tailwind CSS for utility-first styling, MIUI (Material-UI) for UI components
- **Charts:** Recharts for visualizing project and task statistics
- **Authentication:** Handles JWT tokens (login, signup, logout), stores tokens securely
- **Routing:** Next.js file-based routing for pages (Dashboard, Projects, Tasks, Teams, Profile, etc.)
- **API Communication:** RTK Query for seamless backend integration
- **UI Components:** Custom and MIUI components for forms, lists, modals, notifications, etc.
- **Protected Routes:** Middleware to redirect unauthenticated users to login

**Key Files/Folders:**
- `client/app/authProvider.tsx` — Handles authentication context and logic
- `client/pages/` — Main page components (Dashboard, Projects, Tasks, etc.)
- `client/components/` — Reusable UI components
- `client/state/` — Redux slices, RTK Query API definitions, and TypeScript interfaces

---

## Backend Details

- **Framework:** Express with TypeScript
- **ORM:** Prisma for database access and migrations
- **Database:** PostgreSQL
- **Authentication:** JWT-based, with middleware to protect routes
- **Password Security:** Uses bcrypt for hashing passwords
- **API Structure:** RESTful endpoints for users, projects, tasks, teams, and authentication
- **Middleware:** Helmet for security, CORS for cross-origin requests, Morgan for logging
- **Error Handling:** Centralized error handling for API responses
- **Environment Variables:** Uses dotenv for configuration

**Key Files/Folders:**
- `server/src/controllers/` — Business logic for each resource (users, projects, tasks, auth, etc.)
- `server/src/routes/` — Route definitions for each resource
- `server/src/middleware/authMiddleware.ts` — JWT authentication middleware
- `server/src/utils/auth.ts` — JWT token generation and verification
- `server/prisma/schema.prisma` — Prisma schema for database models

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/project-management.git
cd project-management
```

### 2. Install Dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### 3. Configure Environment Variables

#### Backend (`server/.env`)

```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/yourdb
JWT_SECRET=your-very-secret-key
PORT=8000
```

#### Frontend (`client/.env`)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Set Up the Database

```sh
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the Application

#### Backend

```sh
cd server
npm run dev
```

#### Frontend

```sh
cd client
npm run dev
```

---

## API Endpoints

### Auth

- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive a JWT

### Users

- `GET /users` — List all users
- `GET /users/:userId` — Get user by ID
- `GET /users/me` — Get current user profile (JWT required)
- `POST /users` — Create a user

### Projects

- `GET /projects` — List all projects
- `POST /projects` — Create a project

### Tasks

- `GET /tasks` — List all tasks
- `POST /tasks` — Create a task

### Teams

- `GET /teams` — List all teams
- `POST /teams` — Create a team

### Search

- `GET /search` — Search projects, tasks, or users

---

## Authentication

- All protected routes require a JWT in the `Authorization` header:
  ```
  Authorization: Bearer <token>
  ```

---

## Folder Structure

```
project-management/
│
├── client/         # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── state/
│   └── ...
│
└── server/         # Express backend
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── routes/
    │   ├── utils/
    │   └── index.ts
    ├── prisma/
    │   └── schema.prisma
    └── package.json
```

---

## Security Notes

- Passwords are hashed using bcrypt before storage.
- JWT tokens are signed with a secret and expire after 7 days.
- Use HTTPS in production and store secrets securely.
- Consider using HttpOnly cookies for JWT in production.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

MIT

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material-UI (MIUI)](https://mui.com/)
- [Recharts](https://recharts.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
