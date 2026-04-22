# Capstone2026 — Student Registration App

A full-stack student registration platform where students can sign up, browse courses, enroll/unenroll, and track progress. Administrators manage users, courses, and enrollment.

## Team

- Peja Vrajich
- Seth T.

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express 5
- **Database:** PostgreSQL (`pg`)
- **Auth:** Passport (local + Google OAuth 2.0), bcrypt, JWT, express-session
- **Security:** helmet, express-validator
- **Logging:** Winston (app logs) + Morgan (HTTP access logs)

## Features

### Students
- Sign up / log in with email + password or Google OAuth
- View and update profile (username, email, name, phone, address)
- Browse and search courses
- Register and unregister for courses
- View enrolled courses, credit hours, and tuition totals

### Administrators
- View, create, edit, and delete users
- Create, edit, and delete courses
- Register/unregister any student for any course
- Verify course completions
- Search/filter for users and courses

## Project Structure

```
capstone/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       └── context/
├── server/          # Express backend
│   ├── server.js
│   ├── logs/        # Winston log output
│   └── .env
└── package.json
```

## Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database

### 1. Clone and install

```bash
git clone <repo-url>
cd capstone
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment variables

Copy `server/.env.example` to `server/.env` and fill in values:

```
PORT=3005
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:3005

DATABASE_URL=postgresql://user:password@host:5432/dbname

SESSION_SECRET=<long random string>
JWT_SECRET=<long random string>
JWT_EXPIRES_IN=24h

GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>

LOG_LEVEL=info
```

### 3. Database schema

The app expects these tables in Postgres:

- `users` — id, username, password, admin, classes, first_name, last_name, phone, address, created_at, updated_at
- `classes` — id, course_id, course_title, course_description, classroom_number, capacity, credit_hours, tuition_cost, created_at, updated_at
- `admins` — id (admin code lookup)
- `completed_classes` — completion_id, course_id, user_id, admin_verified, created_at, updated_at (auto-created on first use)

### 4. Run in development

From the project root:

```bash
# backend
cd server && npm run dev

# frontend (in a second terminal)
cd client && npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3005

### 5. Production build

```bash
npm run build   # installs deps and builds the client
npm start       # serves the built client from Express on $PORT
```

## Authentication

- `POST /api/createUser` — hashes the password with bcrypt, returns a signed JWT
- `POST /api/loginUser` — verifies via passport-local + bcrypt, returns a signed JWT
- `GET  /api/auth/google` → `GET /api/auth/google/callback` — Google OAuth, returns JWT in redirect URL
- `GET  /api/auth/me` — JWT-protected, returns the current user

The client stores the JWT in `localStorage` as `token` and the user object as `user`.

## Logging

- HTTP requests: Morgan → Winston (combined format)
- Application logs: Winston with `console`, `logs/combined.log`, and `logs/error.log` transports
- Log level controlled by `LOG_LEVEL` env var

## Deployment

The app is designed to be deployed to Render (or similar).

- Set all env vars from `.env.example` in the hosting dashboard
- `DATABASE_URL` points to a hosted Postgres instance (SSL enabled)
- `CLIENT_URL` and `SERVER_URL` must match the deployed domain
- Google OAuth redirect URI must be added to the Google Cloud Console
