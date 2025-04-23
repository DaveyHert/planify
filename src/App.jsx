import { Routes, Route, useLocation } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

// import pages 
import {ProtectedRoutes, PublicRoutes, Dashboard, SignUp, SignIn, Home, Project, Create} from "@/pages/index";

// Import components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { authIsReady, user } = useAuthContext();
  const currentlocation = useLocation().pathname;

  const showSidebar =
    currentlocation !== "/" &&
    currentlocation !== "/sign-up" &&
    currentlocation !== "/sign-in";
  // Bug, error page shows sidebar

  return (
    authIsReady && (
      <>
        <div className="App">
          {showSidebar && user && <Sidebar />}
          <div className="container">
            {currentlocation !== "/" && <Navbar />}
            <Routes>
              {/* Protected Routes: Only accessible if logged in */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/create" element={<Create />} />
              </Route>

              {/* Public Routes: Only accessible if NOT logged in */}
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>

              {/* General Routes: Accessible to anyone */}
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </div>
      </>
    )
  );
}

export default App;
