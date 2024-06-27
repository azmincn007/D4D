// PasswordInputAdmin.jsx
import React from 'react';

const PasswordInputAdmin = () => {
  return (
    <div className="password-input">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        autoComplete="current-password"  // <-- Use autoComplete instead of autocomplete
        placeholder="Enter your password"
      />
    </div>
  );
};

export default PasswordInputAdmin;
