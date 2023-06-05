import React from 'react';

const AuthorityDropdown = ({ onChange, value }) => {
  console.log(value)
  return (
    <div className="form-group">
      <label htmlFor="authority">Authority</label>
      <select className="form-control" name={value} onChange={onChange} value={value}>
        <option value="" selected>Select Authority</option>
        <option value="region">Region</option>
        <option value="business_hub">Business Hub</option>
        <option value="service_center">Service Center</option>
      </select>
      <small>Authority cannot be empty</small>
    </div>
  );
};

export default AuthorityDropdown;