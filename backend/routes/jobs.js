const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');
const { validateJobRequest } = require('../middleware/validation');
const { requireAuth } = require('../middleware/auth');

// GET /api/jobs - List all jobs with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    
    let filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await JobRequest.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id - Fetch a single job
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id).select('-__v');
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs - Create a new job
router.post('/', requireAuth, validateJobRequest, async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;

    const job = await JobRequest.create({
      title: title.trim(),
      description: description.trim(),
      category: category || 'Other',
      location: location.trim(),
      contactName: contactName.trim(),
      contactEmail: contactEmail.toLowerCase().trim()
    });

    res.status(201).json({
      success: true,
      message: 'Job request created successfully',
      data: job
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/jobs/:id - Update status only
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    if (!['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: Open, In Progress, or Closed'
      });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job status updated successfully',
      data: job
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job request deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
