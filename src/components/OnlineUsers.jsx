import { useCollection } from "../hooks/useCollections";
import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import "./OnlineUsers.css";
import OnlineUsersIcon from "../assets/online-users.svg";

export default function OnlineUsers() {
  const { data, error } = useCollection("users");
  const [isOpen, setIsOpen] = useState(false);

  // auto close openned mobile sidebar on desktop/tablet
  useEffect(() => {
    const handleOpenSidebar = () => {
      if (window.innerWidth < 1400) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleOpenSidebar);
    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleOpenSidebar);
  }, []);

  return (
    <div
      className={`user-list ${isOpen ? "open" : "close"}`}
      title="Online Users"
    >
      <span className="online-users-btn" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#434343"
        >
          <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
        </svg>
      </span>
      <h2>All Users</h2>
      <div className="list-content">
        {error && <div className="error">{error}</div>}
        {data &&
          data.map((user) => (
            <div key={user.id} className="user-list-item">
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          ))}
      </div>
    </div>
  );
}
