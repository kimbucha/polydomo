import React, { useState, useRef, useEffect } from 'react';

export const SettingsModal = ({ settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    email: '',
    feedbackType: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });
  const modalRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSave = () => {
    onSave(localSettings);
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
            version: '1.0.0', // Or get from your manifest
            browser: navigator.userAgent
          }
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFeedbackStatus({
          message: 'Thank you for your feedback!',
          type: 'success'
        });
        setTimeout(() => {
          setShowFeedback(false);
          setFeedbackData({ email: '', feedbackType: 'general', message: '' });
        }, 2000);
      } else {
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

  useEffect(() => {
    const handleFeedbackResult = (message) => {
      console.log('Received feedback result:', message);
      
      if (message.type === 'FEEDBACK_RESULT') {
        setFeedbackStatus({
          message: 'Thank you for your feedback!',
          type: 'success'
        });
        setTimeout(() => {
          setShowFeedback(false);
          setFeedbackData({ email: '', feedbackType: 'general', message: '' });
        }, 2000);
      } else if (message.type === 'FEEDBACK_ERROR') {
        setFeedbackStatus({
          message: message.error || 'An unexpected error occurred',
          type: 'error'
        });
      }
      setIsSubmitting(false);
    };

    chrome.runtime.onMessage.addListener(handleFeedbackResult);
    return () => chrome.runtime.onMessage.removeListener(handleFeedbackResult);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper" ref={modalRef}>
        <div className="modal-header">
          <h3>{showFeedback ? 'Send Feedback' : 'Settings'}</h3>
          <button className="icon-btn" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {!showFeedback ? (
          // Settings Form
          <div className="settings-form">
            <div className="settings-group">
              <label htmlFor="focusDuration">Focus Duration (minutes)</label>
              <input
                id="focusDuration"
                type="number"
                min="1"
                max="60"
                value={localSettings.focusDuration}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  focusDuration: Math.min(60, Math.max(1, parseInt(e.target.value) || 25))
                })}
              />
            </div>

            <div className="settings-group">
              <label htmlFor="breakDuration">Break Duration (minutes)</label>
              <input
                id="breakDuration"
                type="number"
                min="1"
                max="30"
                value={localSettings.breakDuration}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  breakDuration: Math.min(30, Math.max(1, parseInt(e.target.value) || 5))
                })}
              />
            </div>

            <div className="settings-group">
              <label htmlFor="dailyGoal">Daily Goal (pomodoros)</label>
              <input
                id="dailyGoal"
                type="number"
                min="1"
                max="16"
                value={localSettings.dailyGoal}
                onChange={(e) => setLocalSettings({
                  ...localSettings,
                  dailyGoal: Math.min(16, Math.max(1, parseInt(e.target.value) || 8))
                })}
              />
            </div>

            <div className="settings-footer">
              <button 
                className="feedback-button"
                onClick={() => setShowFeedback(true)}
              >
                Send Feedback
              </button>
              
              <div className="settings-actions">
                <button className="secondary-button" onClick={onClose}>
                  Cancel
                </button>
                <button className="primary-button" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Feedback Form
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="email">Email (optional)</label>
              <input
                type="email"
                id="email"
                value={feedbackData.email}
                onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="feedbackType">Feedback Type</label>
              <select
                id="feedbackType"
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
  );
}; 