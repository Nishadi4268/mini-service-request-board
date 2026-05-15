# Testing Guide

Complete testing instructions for the GlobalTNA Mini Service Request Board.

## Prerequisites

- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- MongoDB running with sample data (from `npm run seed`)

## Unit Test Scenarios

### 1. Backend API Tests

#### Test 1.1: Create Job Request (POST /api/jobs)
**Success Case:**
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Replace broken window",
    "description": "Front room window is cracked and needs replacement with double glazing",
    "category": "Other",
    "location": "London",
    "contactName": "Jane Doe",
    "contactEmail": "jane@example.com"
  }'
```
**Expected Response:** 
- Status: 201 Created
- Body: Success message with created job object

**Validation Error Case:**
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fix",
    "description": "Bad",
    "category": "Plumbing",
    "location": "London",
    "contactName": "John",
    "contactEmail": "invalid-email"
  }'
```
**Expected Response:**
- Status: 400 Bad Request
- Body: Validation error messages

#### Test 1.2: Get All Jobs (GET /api/jobs)
```bash
curl http://localhost:5000/api/jobs
```
**Expected Response:**
- Status: 200 OK
- Returns array of jobs

**With Category Filter:**
```bash
curl "http://localhost:5000/api/jobs?category=Plumbing"
```
**Expected:** Only Plumbing jobs returned

**With Status Filter:**
```bash
curl "http://localhost:5000/api/jobs?status=Open"
```
**Expected:** Only Open jobs returned

**With Search:**
```bash
curl "http://localhost:5000/api/jobs?search=kitchen"
```
**Expected:** Jobs with 'kitchen' in title or description

#### Test 1.3: Get Single Job (GET /api/jobs/:id)
```bash
# Get first job
curl http://localhost:5000/api/jobs

# Copy _id from response and test
curl http://localhost:5000/api/jobs/{jobId}
```
**Expected Response:**
- Status: 200 OK
- Returns single job object

**Invalid ID:**
```bash
curl http://localhost:5000/api/jobs/invalid123
```
**Expected Response:**
- Status: 400 Bad Request
- Message about invalid ID format

**Non-existent ID:**
```bash
curl http://localhost:5000/api/jobs/507f1f77bcf86cd799439999
```
**Expected Response:**
- Status: 404 Not Found
- Message: "Job request not found"

#### Test 1.4: Update Job Status (PATCH /api/jobs/:id)
```bash
# Get a job ID first
JOBID=$(curl -s http://localhost:5000/api/jobs | jq -r '.data[0]._id')

# Update status
curl -X PATCH http://localhost:5000/api/jobs/$JOBID \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
```
**Expected Response:**
- Status: 200 OK
- Job object with updated status

**Invalid Status:**
```bash
curl -X PATCH http://localhost:5000/api/jobs/{jobId} \
  -H "Content-Type: application/json" \
  -d '{"status": "InvalidStatus"}'
```
**Expected Response:**
- Status: 400 Bad Request
- Message about invalid status

#### Test 1.5: Delete Job (DELETE /api/jobs/:id)
```bash
curl -X DELETE http://localhost:5000/api/jobs/{jobId}
```
**Expected Response:**
- Status: 200 OK
- Message: "Job request deleted successfully"

**Verify Deletion:**
```bash
curl http://localhost:5000/api/jobs/{jobId}
```
**Expected Response:**
- Status: 404 Not Found

---

### 2. Frontend UI Tests

#### Test 2.1: Home Page Load
1. Open `http://localhost:3000`
2. **Verify:**
   - Page title shows "GlobalTNA"
   - All jobs are displayed as cards
   - Filter dropdowns are visible
   - Search input is available

#### Test 2.2: Category Filter
1. Select "Plumbing" from category filter
2. **Verify:**
   - Jobs list updates immediately
   - Only Plumbing category jobs shown
3. Select "All Categories"
4. **Verify:** All jobs return

#### Test 2.3: Status Filter
1. Select "Open" from status filter
2. **Verify:**
   - Only jobs with "Open" status shown
3. Select "In Progress"
4. **Verify:** Only "In Progress" jobs shown

#### Test 2.4: Keyword Search
1. Type "plumb" in search box
2. **Verify:** Jobs with "plumb" in title/description appear
3. Type "roof"
4. **Verify:** Jobs with "roof" appear
5. Clear search
6. **Verify:** All jobs return

#### Test 2.5: View Job Details
1. Click "View Details" on any job
2. **Verify:**
   - Full job information displays
   - Contact name and email shown
   - Status badge visible
   - Category badge visible
   - Created date shown
3. Click "Back to Jobs"
4. **Verify:** Return to home page

#### Test 2.6: Create New Job
1. Click "Post New Job" in header
2. **Verify:** New job form page loads
3. Leave title empty, click submit
4. **Verify:** "Title is required..." error shows
5. Enter title with 3 chars, click submit
6. **Verify:** Validation error shows
7. Fill all fields correctly:
   ```
   Title: Roof inspection needed
   Description: Need professional roof inspection for damage
   Category: Other
   Location: Manchester
   Name: Bob Smith
   Email: bob@example.com
   ```
8. Click "Post Job Request"
9. **Verify:** 
   - Success message appears
   - Redirect to home page after ~1.5 seconds
   - New job appears in list

#### Test 2.7: Update Job Status
1. Click "View Details" on a job
2. Click status button (e.g., "In Progress")
3. **Verify:**
   - Button becomes disabled during update
   - Status changes after success
   - Status badge color updates
4. Click different status button
5. **Verify:** Status updates again

#### Test 2.8: Delete Job
1. Click "View Details" on a job
2. Scroll to "Danger Zone" section
3. Click "Delete Job Request"
4. **Verify:** Confirmation dialog appears
5. Click "Cancel"
6. **Verify:** Dialog closes, job still exists
7. Click "Delete Job Request" again
8. Click "Yes, Delete"
9. **Verify:**
   - Job is deleted
   - Redirect to home page
   - Job no longer in list

#### Test 2.9: Form Validation
1. Go to `/jobs/new`
2. Test each field:

| Field | Invalid Input | Expected Error |
|-------|---|---|
| Title | "Fix" | "must be at least 5 characters" |
| Description | "Fix it" | "must be at least 10 characters" |
| Location | "" | "Location is required" |
| Name | "" | "Contact name is required" |
| Email | "notanemail" | "valid email is required" |

#### Test 2.10: Responsive Design
1. Open frontend at `http://localhost:3000`
2. Resize browser to different widths:
   - Desktop (1920px)
   - Tablet (768px)
   - Mobile (375px)
3. **Verify:**
   - Layout adapts properly
   - Text is readable
   - Buttons are clickable
   - No horizontal scroll

---

## Integration Tests

### Test 3.1: End-to-End Flow
1. Home page → View job details → Back
2. Home page → Filter by category → Search → View detail
3. Create new job → Verify in list → Update status → Delete
4. Filter multiple times → Search → Clear filters

### Test 3.2: Error Handling
1. Turn off backend → Try to load home page
2. **Verify:** Error message appears
3. Restart backend
4. **Verify:** Page loads successfully

### Test 3.3: Data Persistence
1. Create a job
2. Refresh page
3. **Verify:** Job still exists
4. Filter to find job
5. **Verify:** Job appears in filter results

---

## API Response Testing

### Test 4.1: HTTP Status Codes

| Endpoint | Method | Status | Condition |
|----------|--------|--------|-----------|
| /api/jobs | GET | 200 | Any filter |
| /api/jobs/:id | GET | 200 | Valid ID |
| /api/jobs/:id | GET | 404 | Invalid ID |
| /api/jobs | POST | 201 | Valid data |
| /api/jobs | POST | 400 | Missing fields |
| /api/jobs/:id | PATCH | 200 | Valid status |
| /api/jobs/:id | PATCH | 400 | Invalid status |
| /api/jobs/:id | DELETE | 200 | Valid ID |
| /api/jobs/:id | DELETE | 404 | Invalid ID |

### Test 4.2: Response Format
All successful responses should include:
```json
{
  "success": true,
  "message": "...",
  "data": { /* job object */ }
}
```

All error responses should include:
```json
{
  "success": false,
  "message": "...",
  "errors": [ /* array of error messages */ ]
}
```

---

## Performance Tests

### Test 5.1: Load Time
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Open `http://localhost:3000`
4. **Verify:** Page loads in < 3 seconds
5. Click "View Details"
6. **Verify:** Detail page loads in < 1 second

### Test 5.2: Search Performance
1. Type quickly in search box
2. **Verify:** Results update smoothly
3. No lag or stuttering

---

## Database Tests

### Test 6.1: Seed Script
```bash
cd backend
npm run seed
```
**Verify:**
- Script completes without errors
- 10 jobs inserted
- Jobs visible in API: `curl http://localhost:5000/api/jobs`

### Test 6.2: Data Integrity
1. Create a job with special characters
2. Retrieve the job
3. **Verify:** Data matches input

### Test 6.3: Email Validation
Test email formats:
- ✅ Valid: `user@example.com`, `john.doe@company.co.uk`
- ❌ Invalid: `notanemail`, `user@`, `@example.com`

---

## Mobile Testing

### Test 7.1: Touch Interactions
1. Open on mobile device or DevTools mobile view
2. Tap buttons → should work
3. Tap form inputs → should focus
4. Scroll → should be smooth

### Test 7.2: Mobile Forms
1. Open job creation form on mobile
2. Fill out all fields
3. Submit
4. **Verify:** Works correctly on mobile

---

## Security Tests

### Test 8.1: Input Sanitization
Test that backend handles:
- SQL injection attempts (prevented by Mongoose)
- XSS attempts (prevented by React/Next.js)
- Invalid JSON

### Test 8.2: Email Validation
- Invalid emails rejected
- Valid emails accepted

---

## Quick Test Checklist

### Before Submission
- [ ] Backend starts without errors: `npm run dev`
- [ ] Frontend starts without errors: `npm run dev`
- [ ] Sample data loads: `npm run seed`
- [ ] All 5 API endpoints work
- [ ] Home page loads and displays jobs
- [ ] Filters work (category, status, search)
- [ ] Can create new job
- [ ] Can view job details
- [ ] Can update job status
- [ ] Can delete job
- [ ] Form validation works
- [ ] Error handling displays messages
- [ ] No console errors
- [ ] Responsive design works
- [ ] README is clear and complete

---

## Debugging Tips

### If Tests Fail

**API returns 500 error:**
- Check MongoDB is running
- Check MONGODB_URI in .env
- Check server logs for errors

**Frontend shows "Failed to load jobs":**
- Verify backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env
- Check browser console for errors

**Form won't submit:**
- Check browser console for validation errors
- Verify all required fields are filled
- Check network tab to see API response

**Database is empty:**
- Run `npm run seed` in backend
- Check MongoDB connection

---

## Test Results Template

```
Test Date: ___________
Tester: ___________

API Tests: ☐ Passed ☐ Failed
Frontend Tests: ☐ Passed ☐ Failed
Integration Tests: ☐ Passed ☐ Failed
Mobile Tests: ☐ Passed ☐ Failed

Notes:
___________________________________________
___________________________________________

Issues Found:
___________________________________________
___________________________________________

Ready for Deployment: ☐ Yes ☐ No
```

---

Good luck with testing! 🧪
