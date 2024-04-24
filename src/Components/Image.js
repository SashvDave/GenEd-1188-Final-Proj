import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

Image.defaultProps = {
  alt: '',
  className: '',
};

export default Image;
