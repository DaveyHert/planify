import Avatar from "./Avatar";
import NavLinks from "./NavLinks";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <NavLinks />
      </div>
    </div>
  );
}
