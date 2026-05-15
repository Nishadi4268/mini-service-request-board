# GlobalTNA - Mini Service Request Board

A full-stack web application connecting homeowners with tradespeople. Post service requests and browse open jobs in your area.

## 🎯 Project Overview

GlobalTNA is a stripped-down service request platform built as a technical assessment. It features a React/Next.js frontend, Express backend, and MongoDB database.

### Features
- ✅ Browse all service requests with real-time filtering
- ✅ Post new service requests with validation
- ✅ View detailed job information
- ✅ Update job status (Open → In Progress → Closed)
- ✅ Delete job requests
- ✅ Search across job titles and descriptions
- ✅ Filter by category and status
- ✅ Fully responsive design with Tailwind CSS

## 📋 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: JavaScript (React)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment**: dotenv

## 🗂️ Project Structure

```
GlobalTNA/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js          # Root layout
│   │   │   ├── page.js            # Home page
│   │   │   ├── globals.css        # Global styles
│   │   │   └── jobs/
│   │   │       ├── new/page.js    # New job form
│   │   │       └── [id]/page.js   # Job details page
│   │   ├── components/
│   │   │   ├── Header.jsx         # Navigation header
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   ├── JobCard.jsx        # Job card component
│   │   │   └── JobFilter.jsx      # Filter component
│   │   ├── lib/
│   │   │   └── api.js             # API service
│   │   └── globals.css            # Tailwind imports
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
└── backend/
    ├── server.js                   # Main server file
    ├── models/
    │   └── JobRequest.js           # Mongoose schema
    ├── routes/
    │   └── jobs.js                 # API routes
    ├── middleware/
    │   ├── errorHandler.js         # Error handling
    │   └── validation.js           # Input validation
    ├── scripts/
    │   └── seed.js                 # Database seeding
    ├── package.json
    ├── .env.example
    └── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit `.env` and update:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/globaltna
   NODE_ENV=development
   JWT_SECRET=replace_with_strong_secret
   AUTH_EMAIL=admin@globaltna.com
   AUTH_PASSWORD=Admin@123
   ```

   **MongoDB Options:**
   - **Local MongoDB**: `mongodb://localhost:27017/globaltna`
   - **MongoDB Atlas**: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/globaltna`

5. **Seed the database (Optional)**
   ```bash
   npm run seed
   ```
   This inserts 10 sample job requests for testing.

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit `.env`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## 📖 API Documentation

### Authentication

Use this endpoint to obtain a JWT token:

```
POST /api/auth/login
```

Request body:

```json
{
   "email": "admin@globaltna.com",
   "password": "Admin@123"
}
```

Protected routes:
- `POST /api/jobs`
- `DELETE /api/jobs/:id`

Send token as header:

```
Authorization: Bearer <jwt_token>
```

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Jobs
```
GET /jobs
```

**Query Parameters:**
- `category` (optional): Filter by category (Plumbing, Electrical, etc.)
- `status` (optional): Filter by status (Open, In Progress, Closed)
- `search` (optional): Search in title and description

**Example:**
```bash
curl "http://localhost:5000/api/jobs?category=Plumbing&status=Open"
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Need a plumber for a leaking kitchen tap",
      "description": "Kitchen tap is leaking...",
      "category": "Plumbing",
      "location": "Glasgow",
      "contactName": "John Smith",
      "contactEmail": "john@example.com",
      "status": "Open",
      "createdAt": "2024-05-15T10:30:00Z"
    }
  ]
}
```

#### 2. Get Single Job
```
GET /jobs/:id
```

**Response:**
```json
{
  "success": true,
  "data": { /* job object */ }
}
```

#### 3. Create New Job
```
POST /jobs
```

**Request Body:**
```json
{
  "title": "Fix leaking kitchen tap",
  "description": "Kitchen tap is leaking from the base",
  "category": "Plumbing",
  "location": "Glasgow",
  "contactName": "John Smith",
  "contactEmail": "john@example.com"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Job request created successfully",
  "data": { /* created job object */ }
}
```

#### 4. Update Job Status
```
PATCH /jobs/:id
```

**Request Body:**
```json
{
  "status": "In Progress"
}
```

**Valid Statuses:** `Open`, `In Progress`, `Closed`

**Response:**
```json
{
  "success": true,
  "message": "Job status updated successfully",
  "data": { /* updated job object */ }
}
```

#### 5. Delete Job
```
DELETE /jobs/:id
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Job request deleted successfully",
  "data": {}
}
```

## 🎨 Data Model

### JobRequest Schema

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| title | String | Yes | Min 5, Max 100 chars |
| description | String | Yes | Min 10, Max 1000 chars |
| category | String | No | Enum: Plumbing, Electrical, Painting, Joinery, Carpentry, HVAC, Other |
| location | String | Yes | Required |
| contactName | String | Yes | Required |
| contactEmail | String | Yes | Valid email format |
| status | String | No | Enum: Open, In Progress, Closed (default: Open) |
| createdAt | Date | Auto | Auto-set on creation |
| updatedAt | Date | Auto | Auto-updated on modification |

## 🧪 Testing the Application

### Manual Testing Steps

1. **Open frontend** at `http://localhost:3000`

2. **Test Home Page**
   - View all job listings
   - Filter by category
   - Filter by status
   - Search by keyword

3. **Test Create Job**
   - Navigate to "Post New Job"
   - Fill in all required fields
   - Verify validation messages for invalid input
   - Submit and verify redirect to home

4. **Test Job Details**
   - Click "View Details" on any job
   - Verify all information displays correctly
   - Change job status using dropdown
   - Delete a job

5. **Test API Directly**
   ```bash
   # Get all jobs
   curl http://localhost:5000/api/jobs

   # Get specific job
   curl http://localhost:5000/api/jobs/{jobId}

   # Filter jobs
   curl "http://localhost:5000/api/jobs?category=Plumbing&status=Open"
   ```

## 🔍 Error Handling

The API returns appropriate HTTP status codes:

- **200 OK**: Successful GET/PATCH/DELETE
- **201 Created**: Successful POST
- **400 Bad Request**: Validation errors, invalid input
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server-side error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ /* detailed error messages */ ]
}
```

## 📦 Available Scripts

### Backend
```bash
npm start       # Run production server
npm run dev     # Run with hot-reload (requires nodemon)
npm run seed    # Seed database with sample data
npm test        # Run Jest API tests
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Run production build
npm run lint    # Run ESLint
```

## 🌐 Deployment Ready

The application is ready for deployment to:

**Frontend:**
- Vercel
- Netlify
- Any Node.js hosting

**Backend:**
- Render
- Railway
- Heroku
- DigitalOcean
- AWS

### Live URLs

Live URLs are not included yet in this repository because deployment requires your own Vercel/Render or Railway accounts and project ownership.

After deploying, add:
- Frontend URL: `https://<your-frontend>.vercel.app`
- Backend URL: `https://<your-backend>.onrender.com` (or Railway URL)

## 📝 Notes

- The frontend makes direct calls to the Express API (not via Next.js API routes)
- MongoDB connection errors will prevent the backend from starting
- CORS is enabled on the backend for local development
- Input validation happens both client-side and server-side
- All timestamps are stored in UTC

## 🎯 Assignment Requirements Met

✅ Frontend: Next.js (App Router)
✅ Backend: Node.js + Express (Separate from Next.js)
✅ Database: MongoDB
✅ ODM: Mongoose
✅ Styling: Tailwind CSS
✅ Data Model: JobRequest with all required fields
✅ API: REST endpoints with proper HTTP status codes
✅ Input Validation: Both client-side and server-side
✅ Error Handler: Global error handling middleware
✅ 404 Handling: Proper 404 responses
✅ Three Main Pages: Home, New Job, Job Details
✅ Category Filter: Dropdown filter on home page
✅ Search: Keyword search across title and description
✅ Status Update: Change status from job detail page
✅ Delete Function: Delete button with confirmation
✅ Clean UI: Responsive design with Tailwind CSS
✅ Seed Script: 10 sample jobs for testing
✅ README: Comprehensive documentation

## 📧 Contact

For questions or issues, please refer to the assessment requirements.

---

**Created**: May 2024
**Status**: Complete
#   m i n i - s e r v i c e - r e q u e s t - b o a r d  
 