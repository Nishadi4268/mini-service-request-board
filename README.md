# 🏗️ GlobalTNA - Mini Service Request Board

> A modern, full-stack web application connecting homeowners with tradespeople. Post service requests and browse open jobs in your area with ease.

**Status:** ✅ Complete & Ready to Deploy | **Last Updated:** May 2026

---

## 🎯 What is GlobalTNA?

GlobalTNA is a clean, stripped-down service request platform that lets homeowners post job requests and tradespeople find work. Built with modern tech (Next.js, Express, MongoDB), it's perfect for learning full-stack development or as a foundation for a real service marketplace.

### ✨ Key Features
- 🔍 Browse and search all service requests in real-time
- 📝 Post new service requests with client-side & server-side validation
- 📋 View detailed job information with contact details
- 🔄 Update job status (Open → In Progress → Closed)
- ❌ Delete job requests you posted
- 🏷️ Filter by category (Plumbing, Electrical, Painting, etc.) and status
- 📱 Fully responsive design that works on all devices
- 🎨 Clean, professional UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router (production-ready)
- **Tailwind CSS** - Utility-first CSS for beautiful, responsive designs
- **Axios** - Simple HTTP client for API calls
- **JavaScript** - Client-side logic and interactivity

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Lightweight web framework (REST API)
- **MongoDB** - NoSQL database (flexible data storage)
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication & authorization
- **dotenv** - Environment variable management

---

## 📦 Environment Variables

Both the frontend and backend need configuration files. Here's what you need to set up:

### Backend Environment Variables (`.env`)
Create a `.env` file in the `backend/` folder with these variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/globaltna

# Authentication
JWT_SECRET=your_secret_key_here_min_32_chars
AUTH_EMAIL=admin@globaltna.com
AUTH_PASSWORD=Admin@123
```

**Variable Explanations:**
- `PORT` - The port your backend server runs on (default: 5000)
- `NODE_ENV` - Set to `development` for development, `production` for deployment
- `MONGODB_URI` - Connection string to your MongoDB database
  - **For local MongoDB:** `mongodb://localhost:27017/globaltna`
  - **For MongoDB Atlas cloud:** `mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/globaltna`
- `JWT_SECRET` - A strong secret key for JWT tokens (minimum 32 characters recommended)
- `AUTH_EMAIL` - Demo email for testing login
- `AUTH_PASSWORD` - Demo password for testing login

### Frontend Environment Variables (`.env.local`)
Create a `.env.local` file in the `frontend/` folder with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Variable Explanations:**
- `NEXT_PUBLIC_API_URL` - The backend API URL your frontend will communicate with (prefix with `NEXT_PUBLIC_` to expose to browser)

---

## 🚀 Installation & Setup

### Prerequisites
Before you begin, make sure you have:
- **Node.js** v16 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **MongoDB** ([Local install](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas cloud](https://www.mongodb.com/cloud/atlas) - free tier available)
- **Git** (optional, for cloning)

---

## 📋 Step-by-Step Setup

### ✅ Step 1: Clone & Navigate to Backend

Open your terminal and run:

```bash
cd backend
```

### ✅ Step 2: Install Backend Dependencies

```bash
npm install
```

### ✅ Step 3: Create Backend Environment File

```bash
cp .env.example .env
```

Now open the `.env` file and configure it. Here's an example setup:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/globaltna
JWT_SECRET=your_super_secret_key_at_least_32_chars_long_for_security
AUTH_EMAIL=admin@globaltna.com
AUTH_PASSWORD=Admin@123
```

**MongoDB Connection Tips:**

- **Using Local MongoDB?** Just use: `mongodb://localhost:27017/globaltna`
- **Using MongoDB Atlas?** Your `MONGODB_URI` should look like:
  ```
  mongodb+srv://username:password@cluster-name.mongodb.net/globaltna?retryWrites=true&w=majority
  ```

### ✅ Step 4: Seed Sample Data (Recommended)

To populate your database with 10 sample jobs for testing:

```bash
npm run seed
```

This step is optional but recommended so you have data to work with immediately. You can always create jobs manually later.

### ✅ Step 5: Start the Backend Server

```bash
npm run dev
```

You should see output like:
```
✓ Server running on http://localhost:5000
✓ MongoDB connected successfully
```

✅ **Backend is now running!** Keep this terminal open.

---

### ✅ Step 6: Open New Terminal for Frontend

Open a **new terminal window** and navigate to the frontend:

```bash
cd frontend
```

### ✅ Step 7: Install Frontend Dependencies

```bash
npm install
```

### ✅ Step 8: Create Frontend Environment File

```bash
cp .env.example .env.local
```

Now open the `.env.local` file and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### ✅ Step 9: Start the Frontend Server

```bash
npm run dev
```

You should see:
```
✓ Local:        http://localhost:3000
✓ Environments: .env.local
```

---

## 🎮 Your Application is Ready!

You now have the complete application running:

| Component | URL | Status |
|-----------|-----|--------|
| 🖥️ Frontend | http://localhost:3000 | ✅ Open this in your browser |
| ⚙️ Backend API | http://localhost:5000 | ✅ Running in background |
| 🗄️ MongoDB | localhost:27017 | ✅ Connected |

### What You Can Do Now:

1. **Browse jobs** - See all service requests on the home page
2. **Filter & search** - Use the category dropdown and search bar
3. **View job details** - Click any job to see full information
4. **Post a new job** - Click "Post New Job" button and fill out the form
5. **Update job status** - Change status from Open → In Progress → Closed
6. **Delete jobs** - Remove jobs you no longer need

---

## 📝 Available Commands

### Backend Commands

Run these from the `backend/` directory:

```bash
npm start       # Start production server
npm run dev     # Start with auto-reload (development - recommended)
npm run seed    # Populate database with 10 sample jobs
npm test        # Run API tests
```

### Frontend Commands

Run these from the `frontend/` directory:

```bash
npm run dev     # Start development server with hot reload (recommended)
npm run build   # Create optimized production build
npm start       # Run the production build locally
npm run lint    # Check code for linting errors
```

---

## 📚 API Documentation

All API endpoints are accessed via: `http://localhost:5000/api`

### Authentication

For protected endpoints (POST, DELETE), you need a JWT token:

```bash
POST /auth/login
```

**Request body:**
```json
{
  "email": "admin@globaltna.com",
  "password": "Admin@123"
}
```

**Send token in header:**
```
Authorization: Bearer <your_jwt_token_here>
```

**Protected routes requiring authentication:**
- `POST /api/jobs` - Create new job
- `DELETE /api/jobs/:id` - Delete a job

---

### API Endpoints

#### 1️⃣ Get All Jobs
```
GET /jobs
```

**Query Parameters:**
- `category` (optional) - Filter by category (Plumbing, Electrical, Painting, Joinery, Carpentry, HVAC, Other)
- `status` (optional) - Filter by status (Open, In Progress, Closed)
- `search` (optional) - Search in job title and description

**Example request:**
```bash
curl "http://localhost:5000/api/jobs?category=Plumbing&status=Open"
```

**Example response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Fix leaking kitchen tap",
      "description": "Kitchen tap is leaking from the base...",
      "category": "Plumbing",
      "location": "Glasgow",
      "contactName": "John Smith",
      "contactEmail": "john@example.com",
      "status": "Open",
      "createdAt": "2024-05-15T10:30:00Z",
      "updatedAt": "2024-05-15T10:30:00Z"
    }
  ]
}
```

---

#### 2️⃣ Get Single Job
```
GET /jobs/:id
```

**Response:**
```json
{
  "success": true,
  "data": { /* full job object */ }
}
```

---

#### 3️⃣ Create New Job
```
POST /jobs
Authorization: Bearer <jwt_token>
```

**Request body:**
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

---

#### 4️⃣ Update Job Status
```
PATCH /jobs/:id
Authorization: Bearer <jwt_token>
```

**Request body:**
```json
{
  "status": "In Progress"
}
```

**Valid statuses:** `Open`, `In Progress`, `Closed`

**Response:**
```json
{
  "success": true,
  "message": "Job status updated successfully",
  "data": { /* updated job object */ }
}
```

---

#### 5️⃣ Delete Job
```
DELETE /jobs/:id
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Job request deleted successfully",
  "data": {}
}
```

---

## 📊 Data Model

### JobRequest Schema

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `title` | String | ✅ Yes | Min 5, Max 100 characters |
| `description` | String | ✅ Yes | Min 10, Max 1000 characters |
| `category` | String | ❌ No | Enum: Plumbing, Electrical, Painting, Joinery, Carpentry, HVAC, Other |
| `location` | String | ✅ Yes | Required (any string) |
| `contactName` | String | ✅ Yes | Required (min 2 chars) |
| `contactEmail` | String | ✅ Yes | Valid email format required |
| `status` | String | ❌ No | Enum: Open, In Progress, Closed (default: Open) |
| `createdAt` | Date | Auto | Auto-set to creation time (UTC) |
| `updatedAt` | Date | Auto | Auto-updated on each modification (UTC) |

---

## 🧪 Testing the Application

### Manual Testing Checklist

#### Home Page
- [ ] All jobs display correctly
- [ ] Can filter by category
- [ ] Can filter by status
- [ ] Search works across titles and descriptions
- [ ] Job cards show correct information

#### Create New Job
- [ ] Navigate to "Post New Job" page
- [ ] Form has all required fields
- [ ] Validation shows errors for invalid input:
  - Title too short
  - Description too short
  - Invalid email format
  - Missing required fields
- [ ] Successfully submit and redirect to home
- [ ] New job appears in list

#### Job Details Page
- [ ] All job information displays correctly
- [ ] Status dropdown shows all 3 options
- [ ] Can change status and see update
- [ ] Delete button works with confirmation

#### API Testing
```bash
# Get all jobs
curl http://localhost:5000/api/jobs

# Get specific job
curl http://localhost:5000/api/jobs/PASTE_JOB_ID_HERE

# Filter jobs
curl "http://localhost:5000/api/jobs?category=Plumbing&status=Open"

# Search jobs
curl "http://localhost:5000/api/jobs?search=plumbing"
```

---

## 🔍 Error Handling

The API returns appropriate HTTP status codes:

| Status | Meaning | Example |
|--------|---------|---------|
| **200** | ✅ Successful GET/PATCH/DELETE | Job fetched/updated/deleted |
| **201** | ✅ Successful POST | New job created |
| **400** | ❌ Bad Request | Missing required field, invalid data |
| **404** | ❌ Not Found | Job doesn't exist with that ID |
| **500** | ❌ Server Error | Database connection failed |

**Error response format:**
```json
{
  "success": false,
  "message": "Descriptive error message",
  "errors": [
    "Detailed error 1",
    "Detailed error 2"
  ]
}
```

---

## 🌐 Deployment

The application is ready to deploy to:

### Frontend Hosting
- **Vercel** (recommended - made by Next.js creators)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**

### Backend Hosting
- **Render** (recommended - simple)
- **Railway**
- **Heroku** (free tier ended)
- **DigitalOcean**
- **AWS (EC2, Lambda, App Runner)**
- **Google Cloud Platform**
- **Microsoft Azure**

### Deployment Steps
1. Push code to GitHub
2. Connect your hosting provider to your GitHub repo
3. Update environment variables in hosting platform
4. Deploy!

---

## 📋 Project Structure

```
GlobalTNA/
├── 📄 README.md                    # This file
├── 📄 QUICKSTART.md               # Quick start guide
├── 📄 DEVELOPMENT.md              # Development guide
│
├── frontend/                       # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js          # Root layout
│   │   │   ├── page.js            # Home page (all jobs)
│   │   │   ├── globals.css        # Global styles
│   │   │   └── jobs/
│   │   │       ├── new/page.js    # Create new job form
│   │   │       └── [id]/page.js   # Job detail page
│   │   ├── components/
│   │   │   ├── Header.jsx         # Navigation header
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   ├── JobCard.jsx        # Individual job card
│   │   │   └── JobFilter.jsx      # Filter & search component
│   │   ├── lib/
│   │   │   └── api.js             # Axios API service
│   │   └── globals.css            # Tailwind directives
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
└── backend/                        # Express.js API
    ├── server.js                   # Main server entry point
    ├── app.js                      # Express app setup
    ├── package.json
    ├── .env.example
    ├── models/
    │   └── JobRequest.js           # Mongoose schema
    ├── routes/
    │   ├── auth.js                 # Authentication routes
    │   └── jobs.js                 # Job CRUD routes
    ├── middleware/
    │   ├── auth.js                 # JWT verification
    │   ├── errorHandler.js         # Global error handler
    │   └── validation.js           # Input validation
    ├── scripts/
    │   └── seed.js                 # Database seeding script
    └── tests/
        └── api.test.js             # API tests
```

---

## 💡 Tips & Tricks

- **Hot reload**: Both frontend and backend support hot reload - just save your files
- **Seed command**: Run `npm run seed` in backend to quickly populate with test data
- **Clear database**: Delete all documents from MongoDB and re-seed anytime
- **Check backend logs**: Look at terminal output for debugging info
- **Browser DevTools**: Use F12 to see network requests and errors
- **MongoDB Compass**: Download free GUI to browse database visually

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available: `netstat -ano | findstr :5000` (Windows)
- Verify MongoDB is running
- Check `.env` file for typos
- Look for error messages in terminal

### Frontend shows "API connection error"
- Make sure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console (F12) for error details

### MongoDB connection failed
- Verify MongoDB is installed and running
- For local: check `mongod` process
- For Atlas: verify connection string has correct username/password
- Check network connectivity to MongoDB Atlas

### "Cannot find module" errors
- Run `npm install` in the affected directory
- Delete `node_modules` folder and `npm install` again
- Check for typos in import statements

---

## 📧 Notes & Information

- The frontend makes **direct calls** to the Express API (not via Next.js API routes)
- MongoDB connection is required to start the backend
- CORS is enabled on the backend for local development
- Input validation happens **both client-side and server-side** for security
- All timestamps are stored in **UTC timezone**
- Password and email are demo credentials - change them in production!

---

## ✅ Assignment Requirements Met

✅ Frontend: Next.js (App Router)
✅ Backend: Node.js + Express (Separate from Next.js)
✅ Database: MongoDB with Mongoose
✅ Styling: Tailwind CSS
✅ Data Model: JobRequest with all required fields
✅ API: REST endpoints with proper HTTP status codes
✅ Input Validation: Both client-side and server-side
✅ Error Handler: Global error handling middleware
✅ 404 Handling: Proper 404 responses
✅ Three Main Pages: Home, New Job, Job Details
✅ Category Filter: Working dropdown filter
✅ Search: Keyword search across title and description
✅ Status Update: Change status from job detail page
✅ Delete Function: Delete button with confirmation
✅ Clean UI: Responsive design with Tailwind CSS
✅ Seed Script: Database seeding with sample data
✅ README: Comprehensive, human-friendly documentation

---

## 📞 Support

For questions or issues:
1. Check the **Troubleshooting** section above
2. Review error messages in browser console (F12)
3. Check backend terminal output for logs
4. Verify all environment variables are set correctly

---

**Created:** May 2024  
**Last Updated:** May 2026  
**Status:** ✅ Complete & Production Ready  
**Version:** 1.0

**Happy coding! 🚀**
