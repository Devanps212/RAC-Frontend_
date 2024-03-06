import React, { useState, useEffect } from 'react';
import './loading.css';

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('blur', loading);

    return () => {
      document.body.classList.remove('blur');
    };
  }, [loading]);

  return (
    loading && (
      <div className="loading-container">
        <div className="car-container">
          <div className="loading-car">
            <div className="wheel left"></div>
            <div className="wheel right"></div>
          </div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    )
  );
};

export default Loading;
