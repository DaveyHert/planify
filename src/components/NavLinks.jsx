import { NavLink } from "react-router-dom";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import "./NavLinks.css";

export default function NavLinks() {
  return (
    <nav className='nav-links'>
      <ul>
        <li>
          <NavLink to='/dashboard'>
            <img src={DashboardIcon} alt='dashboard icon' />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to='/create'>
            <img src={AddIcon} alt='add project icon' />
            <span>New Project</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
