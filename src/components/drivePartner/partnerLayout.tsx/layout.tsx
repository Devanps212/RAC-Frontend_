import React, { ReactNode } from "react";
import PartnerHeader from "../Navbar/navbar";
import PartnerSideBar from "../Sidebar/sidebar";
import "./layout.css";

interface PartnersLayout {
  children: ReactNode;
}

const PartnerLayout: React.FC<PartnersLayout> = ({ children }) => {
  return (
    <div className="admin-container">
      <PartnerHeader />
      <div className="content-wrapper">
        <PartnerSideBar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PartnerLayout;
