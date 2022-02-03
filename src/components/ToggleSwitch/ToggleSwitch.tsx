import React from 'react';

import './ToggleSwitch.css';

type ToggleSwitchProps = {
  onClick: (e: any) => void;
}

function ToggleSwitch({ onClick }: ToggleSwitchProps) {
  return (
    <label className="switch">
      <input onClick={onClick} type="checkbox" />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;