import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="sidebar_icon" onClick={handleToggleSidebar}>
        {sidebarOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </div>
      {sidebarOpen && (
        <div className="sidebar">
          <div className="sidebar_items">
            <div className="sidebar_item">
              <p>Home</p>
            </div>
            <div className="sidebar_item">
              <p>Kimchi</p>
            </div>
            <div className="sidebar_item">
              <p>Bibimbap</p>
            </div>
            <div className="sidebar_item">
              <p>Bulgogi</p>
            </div>
            <div className="sidebar_item">
              <p>K.F.C</p>
            </div>
            <div className="sidebar_item">
              <p>BBQ</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
