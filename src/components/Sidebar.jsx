import "./Sidebar.css";
import Avatar from "./Avatar";
import NavLinks from "./NavLinks";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <Avatar src={user.photoURL} displayName={user.displayName} />
        <NavLinks />
      </div>
    </div>
  );
}
