import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import UserRouter from './routes/userRoute';
import AdminRoutes from './routes/adminRoute';
import PartnerRoute from './routes/partner/partner';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/*" element={<UserRouter />}/>
        <Route path="/admin/*" element={<AdminRoutes/>}/>
        <Route path="/partner/*" element={<PartnerRoute/>}/>
      </Routes>
    </Router>
  );
}

export default App;
