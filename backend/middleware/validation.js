// Input validation middleware
const validateJobRequest = (req, res, next) => {
  const { title, description, location, contactName, contactEmail } = req.body;

  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    errors.push('Title is required and must be at least 5 characters');
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description is required and must be at least 10 characters');
  }

  if (!location || typeof location !== 'string' || location.trim().length === 0) {
    errors.push('Location is required');
  }

  if (!contactName || typeof contactName !== 'string' || contactName.trim().length === 0) {
    errors.push('Contact name is required');
  }

  if (!contactEmail || !isValidEmail(contactEmail)) {
    errors.push('Valid contact email is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }

  next();
};

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

module.exports = {
  validateJobRequest
};
