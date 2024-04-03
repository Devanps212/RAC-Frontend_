import React, { ReactNode } from "react";
import PartnerHeader from "../Navbar/navbar";
import PartnerSideBar from "../Sidebar/sidebar";
import "./layout.css";

interface PartnersLayout {
  children: ReactNode;
}

const PartnerLayout: React.FC<PartnersLayout> = ({ children }) => {
  return (
    <div className="admin-containers">
      <PartnerHeader />
      <div className="content-wrappers">
        <PartnerSideBar />
        <div className="contents">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PartnerLayout;
