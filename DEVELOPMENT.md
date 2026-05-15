# Development Guide

## Architecture Overview

### Frontend → Backend Communication
```
Next.js App (localhost:3000)
     ↓
Axios HTTP Client
     ↓
Express API (localhost:5000)
     ↓
MongoDB Database
```

## Code Organization

### Frontend (`/frontend`)

**Pages** (`src/app/`)
- `page.js` - Home page with job listings
- `jobs/new/page.js` - Create new job form
- `jobs/[id]/page.js` - Job details view

**Components** (`src/components/`)
- `Header.jsx` - Top navigation
- `Footer.jsx` - Footer with links
- `JobCard.jsx` - Reusable job card
- `JobFilter.jsx` - Filter dropdown

**Utilities** (`src/lib/`)
- `api.js` - Axios service with all API calls

### Backend (`/backend`)

**Models** (`/models`)
- `JobRequest.js` - Mongoose schema with validation

**Routes** (`/routes`)
- `jobs.js` - All REST endpoints

**Middleware** (`/middleware`)
- `validation.js` - Input validation
- `errorHandler.js` - Global error handler

**Scripts** (`/scripts`)
- `seed.js` - Database seeding

**Main**
- `server.js` - Express server setup

## Adding Features

### Add a New API Endpoint

1. Update route in `backend/routes/jobs.js`:
```javascript
router.post('/custom', async (req, res, next) => {
  try {
    // Your logic
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
```

2. Add to API service in `frontend/src/lib/api.js`:
```javascript
customEndpoint: async (data) => {
  try {
    const response = await api.post('/custom', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
```

3. Use in component:
```javascript
const result = await jobsAPI.customEndpoint(data);
```

### Add a New Page

1. Create file in `frontend/src/app/`:
```javascript
export default function NewPage() {
  return <div>Page content</div>;
}
```

2. Access at `/new-page` automatically

### Modify Database Schema

1. Edit `backend/models/JobRequest.js`
2. Add new field with validation:
```javascript
newField: {
  type: String,
  required: true,
  // Add validation rules
}
```

3. Update frontend form to include new field

## Testing Workflows

### Test API Endpoints

```bash
# Get all jobs
curl http://localhost:5000/api/jobs

# Get by category
curl "http://localhost:5000/api/jobs?category=Plumbing"

# Create job
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Job",
    "description": "Test Description",
    "category": "Plumbing",
    "location": "Test City",
    "contactName": "Test Name",
    "contactEmail": "test@example.com"
  }'

# Update status
curl -X PATCH http://localhost:5000/api/jobs/{jobId} \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'

# Delete job
curl -X DELETE http://localhost:5000/api/jobs/{jobId}
```

### Test UI Features

1. **Create Job Flow**
   - Go to `/jobs/new`
   - Fill form with invalid data → see validation errors
   - Fill with valid data → should redirect to home

2. **Filter Flow**
   - Select category filter → jobs should filter
   - Select status filter → jobs should filter
   - Enter search text → title/description should match

3. **Detail Page Flow**
   - Click "View Details" → should load job data
   - Click status buttons → should update status
   - Click delete → should show confirmation → delete

## Debugging Tips

### Frontend Issues
- Check browser console for errors
- Use React DevTools browser extension
- Verify `.env` file has correct `NEXT_PUBLIC_API_URL`
- Check network tab to see API calls

### Backend Issues
- Check terminal for server logs
- Use `console.log()` to debug
- Verify MongoDB connection: `mongosh` or check Atlas
- Test endpoints with curl before debugging UI

### Database Issues
- Check MongoDB is running
- Use MongoDB Compass to view data
- Run seed script: `npm run seed`
- Clear data: `db.jobrequests.deleteMany({})`

## Performance Optimization

### Frontend
- Next.js automatically optimizes images
- Code splitting happens by page
- Consider using `React.memo()` for JobCard

### Backend
- Add database indexing for frequently queried fields
- Implement pagination for large result sets
- Add caching layer for read-heavy operations

## Security Considerations

- Email validation prevents invalid submissions
- CORS properly configured for frontend origin
- MongoDB injection prevented by Mongoose
- Input sanitization on both sides

## Deployment Checklist

### Before Deploying
- [ ] Test all endpoints locally
- [ ] Update `.env` variables for production
- [ ] Remove console.log() statements
- [ ] Test with production MongoDB URI
- [ ] Build frontend: `npm run build`
- [ ] Verify no hardcoded localhost URLs

### Frontend (Vercel)
- [ ] Connect GitHub repo
- [ ] Set environment variables
- [ ] Deploy from main branch

### Backend (Render/Railway)
- [ ] Connect GitHub repo
- [ ] Set environment variables
- [ ] Configure start command: `npm start`
- [ ] Set NODE_ENV to production

## Common Patterns

### Error Handling in Components
```javascript
try {
  const result = await jobsAPI.getSomething();
} catch (error) {
  setError(error?.message || 'An error occurred');
}
```

### Loading States
```javascript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    // Do something
  } finally {
    setLoading(false);
  }
};
```

### Fetch on Mount
```javascript
useEffect(() => {
  fetchData();
}, [dependency]); // Add dependencies
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com)
- [Mongoose Docs](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

Happy developing! 🚀
