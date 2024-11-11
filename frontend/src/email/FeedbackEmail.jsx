import React from 'react';

const FeedbackEmail = ({ feedback }) => {
  console.log('Rendering feedback email with:', feedback);
  return (
    <div>
      <h2>Polydomo Feedback Received</h2>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Feedback Details</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>Type:</strong> {feedback.feedbackType}</li>
          <li><strong>User Email:</strong> {feedback.email || 'Not provided'}</li>
          <li><strong>Time:</strong> {new Date(feedback.timestamp).toLocaleString()}</li>
        </ul>
      </div>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Message</h3>
        <p style={{ whiteSpace: 'pre-wrap' }}>{feedback.message}</p>
      </div>
      
      <div style={{ margin: '20px 0' }}>
        <h3>System Information</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>Version:</strong> {feedback.systemInfo.version}</li>
          <li><strong>Browser:</strong> {feedback.systemInfo.browser}</li>
        </ul>
      </div>
    </div>
  );
};

export default FeedbackEmail; 