import React, { useState, useRef, useEffect } from 'react';

export const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    email: '',
    feedbackType: 'general',
    message: ''
  });
  const [feedbackStatus, setFeedbackStatus] = useState({
    message: '',
    type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localSettings);
    onClose();
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...feedbackData,
          timestamp: new Date().toISOString(),
          systemInfo: {
            version: '1.0.0',
            browser: navigator.userAgent
          }
        })
      });
      
      if (response.ok) {
        setFeedbackStatus({
          message: 'Thank you for your feedback!',
          type: 'success'
        });
        setTimeout(() => {
          setShowFeedback(false);
          setFeedbackData({
            email: '',
            feedbackType: 'general',
            message: ''
          });
        }, 2000);
      } else {
        const data = await response.json();
        setFeedbackStatus({
          message: data.error || 'Failed to send feedback',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFeedbackStatus({
        message: 'Failed to send feedback. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3>{showFeedback ? 'Send Feedback' : 'Settings'}</h3>
          <button className="icon-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          {!showFeedback ? (
            <div className="settings-content">
              <form onSubmit={handleSubmit} className="settings-form">
                <div className="form-group">
                  <label htmlFor="focusDuration">Focus Duration (minutes)</label>
                  <input
                    type="number"
                    id="focusDuration"
                    className="form-input"
                    value={localSettings.focusDuration / 60}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      focusDuration: Math.max(1, Math.min(60, e.target.value)) * 60
                    })}
                    min="1"
                    max="60"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="breakDuration">Break Duration (minutes)</label>
                  <input
                    type="number"
                    id="breakDuration"
                    className="form-input"
                    value={localSettings.breakDuration / 60}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      breakDuration: Math.max(1, Math.min(30, e.target.value)) * 60
                    })}
                    min="1"
                    max="30"
                  />
                </div>

                <button 
                  type="button" 
                  className="feedback-button"
                  onClick={() => setShowFeedback(true)}
                >
                  Send Feedback
                </button>
                
                <div className="settings-actions">
                  <button type="button" className="secondary-button" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="email">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={feedbackData.email}
                  onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="feedbackType">Feedback Type</label>
                <select
                  id="feedbackType"
                  className="form-select"
                  value={feedbackData.feedbackType}
                  onChange={(e) => setFeedbackData({ ...feedbackData, feedbackType: e.target.value })}
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="form-textarea"
                  required
                  value={feedbackData.message}
                  onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                  placeholder="Tell us what you think..."
                  rows={4}
                />
              </div>

              {feedbackStatus.message && (
                <div className={`status-message ${feedbackStatus.type}`}>
                  {feedbackStatus.message}
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="secondary-button" 
                  onClick={() => setShowFeedback(false)}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="primary-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}; 