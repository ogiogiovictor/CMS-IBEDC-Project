import React from 'react';

const RegionDropdown = ({ onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor="region">Region</label>
      <select value={value} className="form-control" onChange={onChange}>
        <option value="">Select Region</option>
        {/* Options for region */}
      </select>
      <small>Region cannot be empty</small>
    </div>
  );
};

export default RegionDropdown;