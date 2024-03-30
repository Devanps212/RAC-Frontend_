import React, { ReactNode } from "react";
import Sidebar from "../admin/sidebar/sidebar";
import Header from "../admin/navbar/navbar";
import './adminLayout.css'

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-container">
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
