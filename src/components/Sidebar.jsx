import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import NavLinks from "./NavLinks";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // auto close openned mobile sidebar on desktop/tablet
  useEffect(() => {
    const handleOpenSidebar = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleOpenSidebar);
    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleOpenSidebar);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className={`sidebar-backdrop ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        />
      )}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? "x" : "☰"}
        </button>
        <div className="sidebar-content">
          <div className="user">
            <Avatar src={user.photoURL} />
            <p>Hey {user.displayName}</p>
          </div>
          <NavLinks />
        </div>
      </div>
    </>
  );
}
