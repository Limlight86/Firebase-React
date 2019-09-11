import React from 'react';
import Loader from 'react-loader-spinner';

export default ({ type = 'Oval', color = '#00BFFF', height = 100, width = 100 }) => (
  <div className="loader-container">
    <Loader type={type} color={color} height={height} width={width} />
  </div>
);
