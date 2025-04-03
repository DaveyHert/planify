import { Routes, Route, useLocation } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

// import pages and components
import ProtectedRoutes from "./pages/ProtectedRoutes";
import PublicRoutes from "./pages/PublicRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";
import SignUp from "./pages/sign-up/SignUp";
import Home from "./pages/Home/Home";
import SignIn from "./pages/sign-in/SignIn";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

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
        <div className='App'>
          {showSidebar && user && <Sidebar />}
          <div className='container'>
            {currentlocation !== "/" && <Navbar />}
            <Routes>
              {/* Protected Routes: Only accessible if logged in */}
              <Route element={<ProtectedRoutes />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/project/:id' element={<Project />} />
                <Route path='/create' element={<Create />} />
              </Route>

              {/* Public Routes: Only accessible if NOT logged in */}
              <Route element={<PublicRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
              </Route>

              {/* General Routes: Accessible to anyone */}
              <Route path='*' element={<p>Page not found</p>} />
            </Routes>
          </div>
        </div>
      </>
    )
  );
}

export default App;
