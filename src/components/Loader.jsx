
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="cloud">
        <div className="rain">
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
          <div className="drop"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
