import { NavLink } from "react-router-dom";


export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active-link" : "nav-link"
        }
      >
        Lista dei Task
      </NavLink>

      <NavLink
        to="/addTask"
        className={({ isActive }) =>
          isActive ? "nav-link active-link" : "nav-link"
        }
      >
        Aggiungi Task
      </NavLink>
    </nav>
  );
}