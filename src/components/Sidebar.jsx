import Avatar from "./Avatar";
import NavLinks from "./NavLinks";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Sidebar.css";
import { useState } from "react";

export default function Sidebar() {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* <div
        className={`sidebar-backdrop ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      /> */}
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
