import React from 'react';
import PropTypes from 'prop-types';

import gear from '../../images/gear-logo.png';

const Loader = ({ loading }) => {
  const loadingClass = loading ? 'loading-true' : null;
  return (
    <div className='logo-images'>
      <img src={gear} className={loadingClass} alt="logo" />
    </div>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool
}

export default Loader;
