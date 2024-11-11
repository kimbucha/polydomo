const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: [
    'chrome-extension://iemafgpjgiidmnffapimpenigkaoijhf',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.post('/api/feedback', async (req, res) => {
  try {
    const { email, feedbackType, message, systemInfo, timestamp } = req.body;
    console.log('Received feedback:', { email, feedbackType, message });

    const data = await resend.emails.send({
      from: 'Polydomo Feedback <onboarding@resend.dev>',
      to: 'kim.nguyen.afk@gmail.com', // Replace with your email
      subject: `Polydomo Feedback: ${feedbackType}`,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>Type:</strong> ${feedbackType}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><strong>System Info:</strong></p>
        <p>Version: ${systemInfo?.version || 'N/A'}</p>
        <p>Browser: ${systemInfo?.browser || 'N/A'}</p>
        <p>Time: ${new Date(timestamp).toLocaleString()}</p>
      `
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 