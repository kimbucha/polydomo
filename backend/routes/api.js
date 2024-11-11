const express = require('express');
const router = express.Router();

// Add this route to your backend
router.post('/send-email', async (req, res) => {
  try {
    // Use the RESEND_API_KEY from backend .env here
    // Handle email sending logic
    // Return response to frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router; 