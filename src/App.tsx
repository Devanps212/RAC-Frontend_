import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import UserRouter from './routes/userRoute';
import AdminLogin from './pages/admin/login';
import AdminRoutes from './routes/adminRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Your other routes can go here */}
        <Route path="/users/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRoutes/>}/>
      </Routes>
    </Router>
  );
}

export default App;
