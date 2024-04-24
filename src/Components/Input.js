import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, name, placeholder, onChange, value, className }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={className}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  className: '',
};

export default Input;
