import React from 'react';

import './ToggleSwitch.css';

function ToggleSwitch() {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;