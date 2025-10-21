import { NavLink } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";

export default function BaseLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        <NavLink className="nav-link" to="/">Home</NavLink>

        {!isAuthenticated && (
          <>
            <NavLink className="nav-link" to="/signin">Login</NavLink>
            <NavLink className="nav-link" to="/signup">Register</NavLink>
          </>
        )}

        {isAuthenticated && (<>
          <NavLink className="nav-link" to="/avatar">Avatar</NavLink>
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
          
          </>
        )}
      </div>
    </nav>
  );
}
