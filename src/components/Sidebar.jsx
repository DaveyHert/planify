import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_ison.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          {/* avater and username here later */}
          <p>Hey user</p>
        </div>
      </div>
    </div>
  );
}
