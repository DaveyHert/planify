import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Logo from "../assets/logo.svg";
import ErrorToast from "./ErrorToast";
import logoutIcon from "../assets/logout.svg";
import "./Navbar.css";

function Navbar() {
  const { user } = useAuthContext();
  const { logOutUser, isPending, error } = useLogout();

  return (
    <nav className={`navbar ${user ? "modify" : ""}`}>
      <ul>
        <li className="logo">
          <Link to="/">
            <img src={Logo} alt="dojo logo" />
            <span>Planify</span>
          </Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/sign-in">Sign in</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign up</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <span className="name">hello, {user.displayName}</span>
            </li>
            <li>
              {!isPending && (
                <button className="btn" onClick={logOutUser}>
                  Logout
                </button>
              )}
              {isPending && (
                <button className="btn" disabled>
                  Logging out
                </button>
              )}
            </li>
            <li className="mobile-logout">
              <img src={logoutIcon} alt="logout icon" onClick={logOutUser} />
            </li>
          </>
        )}
      </ul>
      {error && <ErrorToast message={error} />}
    </nav>
  );
}

export default Navbar;
