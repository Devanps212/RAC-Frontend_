import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import UserRouter from './routes/userRoute';




function App() {
  return (
    <Router>
      <Routes>
        {/* Your other routes can go here */}
        <Route path="/users/*" element={<UserRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
