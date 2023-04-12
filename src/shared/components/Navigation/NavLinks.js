import './NavLinks.css'
import { NavLink } from 'react-router-dom';

function NavLinks(props) {
    return ( <ul className='nav-links'>
        <li>
            <NavLink to="/" exact>All Users</NavLink>
        </li>
        <li>
            <NavLink to="/u1/places">My Places</NavLink>
        </li>
        <li>
            <NavLink to="/places/new">New Place</NavLink>
        </li>
        <li>
            <NavLink to="/login">Login</NavLink>
        </li>
    </ul>);
}

export default NavLinks;