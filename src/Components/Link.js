import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ href, children, className, target }) => {
  return (
    <a href={href} className={className} target={target}>
      {children}
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  target: PropTypes.string,
};

Link.defaultProps = {
  className: '',
  target: '_self',
};

export default Link;
