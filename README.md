# GlobalTNA - Service Request Board

A full-stack web application connecting homeowners with tradespeople for service requests.

## Overview

**Tech Stack:**
- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT

**Features:**
- Browse, search, and filter service requests
- Post new jobs with validation
- Update job status (Open → In Progress → Closed)
- Delete job requests
- Fully responsive design

---

## Environment Variables

### Backend (`.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/globaltna
JWT_SECRET=your_secret_key_min_32_chars
AUTH_EMAIL=admin@globaltna.com
AUTH_PASSWORD=Admin@123
```

**For MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/globaltna
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend (in new terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with API URL
npm run dev
```

**Open:** http://localhost:3000

---

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Production server |
| `npm run dev` | Development with hot reload |
| `npm run seed` | Populate database with sample data |
| `npm test` | Run tests |
| `npm run build` | Build for production |
| `npm run lint` | Check code quality |

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs` | Get all jobs (supports filters) |
| GET | `/jobs/:id` | Get job by ID |
| POST | `/jobs` | Create new job |
| PATCH | `/jobs/:id` | Update job status |
| DELETE | `/jobs/:id` | Delete job |
| POST | `/auth/login` | Login (returns JWT) |

**Query Parameters for GET /jobs:**
- `category` - Filter by category
- `status` - Filter by status (Open, In Progress, Closed)
- `search` - Search title/description

---

## Data Model

**JobRequest:**

| Field | Type | Required |
|-------|------|----------|
| title | String | Yes (5-100 chars) |
| description | String | Yes (10-1000 chars) |
| category | String | Optional |
| location | String | Yes |
| contactName | String | Yes |
| contactEmail | String | Yes (valid email) |
| status | String | No (default: "Open") |
| createdAt | Date | Auto |
| updatedAt | Date | Auto |

---

## Project Structure

```
GlobalTNA/
├── backend/
│   ├── server.js
│   ├── models/JobRequest.js
│   ├── routes/jobs.js & auth.js
│   ├── middleware/
│   ├── scripts/seed.js
│   └── package.json
│
├── frontend/
│   ├── src/app/ (pages)
│   ├── src/components/
│   ├── src/lib/api.js
│   └── package.json
│
└── README.md
```

---

## Features Implemented

✅ Next.js frontend (App Router)
✅ Express backend (separate)
✅ MongoDB database
✅ Mongoose ODM
✅ Tailwind CSS
✅ REST API with proper status codes
✅ Input validation (client & server)
✅ JWT authentication
✅ Global error handling
✅ Search & filtering
✅ Status management
✅ Delete functionality
✅ Database seeding
✅ Responsive design

---

## Notes

- Frontend makes direct API calls to Express
- CORS enabled for local development
- Demo credentials: `admin@globaltna.com` / `Admin@123`
- MongoDB required to start backend
- Both ports (3000 & 5000) must be available

**Status:** Complete  
**Created:** May 2024  
**Updated:** May 2026
