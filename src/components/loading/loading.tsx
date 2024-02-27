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
        <div className="loading-spinner"></div>
        <div>Loading...</div>
      </div>
    )
  );
};

export default Loading;
