import React from 'react';

export const SettingsModal = ({ settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = React.useState(settings);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="settings-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Settings</h3>
          <button className="icon-btn" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="settings-form">
          <div className="settings-group">
            <label htmlFor="focusDuration">Focus Duration</label>
            <div className="input-with-unit">
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
              <span className="unit">minutes</span>
            </div>
          </div>

          <div className="settings-group">
            <label htmlFor="breakDuration">Break Duration</label>
            <div className="input-with-unit">
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
              <span className="unit">minutes</span>
            </div>
          </div>

          <div className="settings-group">
            <label htmlFor="dailyGoal">Daily Goal</label>
            <div className="input-with-unit">
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
              <span className="unit">pomodoros</span>
            </div>
          </div>

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
    </div>
  );
}; 