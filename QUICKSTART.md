# Quick Start Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

## ⚡ 5-Minute Setup

### Step 1: Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed
npm run seed    # Load sample data
npm run dev     # Start on http://localhost:5000
```

### Step 2: Frontend (Terminal 2)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev     # Start on http://localhost:3000
```

### Step 3: Test
- Open `http://localhost:3000`
- Try posting a new job
- Test filtering and search
- Update job status

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/globaltna
NODE_ENV=development
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Common Issues

**Backend won't start:**
- Check MongoDB is running: `mongosh` (or `mongo` for older versions)
- Verify MONGODB_URI in .env

**Frontend can't reach API:**
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env matches backend URL

**Port already in use:**
- Backend: Change `PORT` in .env
- Frontend: `npm run dev -- -p 3001`

## Project Structure
```
GlobalTNA/
├── backend/      ← Express API server
├── frontend/     ← Next.js web app
└── README.md     ← Full documentation
```

## What You Can Do

✅ **Home Page**: View, filter, and search job requests
✅ **Post Job**: Create new service requests
✅ **Job Details**: View full details and update status
✅ **Delete**: Remove job requests
✅ **Filters**: By category, status, and keyword

## Next Steps

1. Review [README.md](./README.md) for detailed API docs
2. Check [backend/models/JobRequest.js](./backend/models/JobRequest.js) for schema
3. Explore [frontend/src/app](./frontend/src/app) for page components

## Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Push to GitHub and connect to Vercel
```

### Backend → Render/Railway
```bash
cd backend
# Push to GitHub and deploy through platform
```

---

Happy coding! 🚀
