import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
    return (
       
        <nav>
            <NavLink to="">Lista dei Task </NavLink>
             <NavLink to="/addTask">Aggiungi Task </NavLink>
        </nav>
    )
}