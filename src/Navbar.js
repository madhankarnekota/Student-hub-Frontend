import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2 className="navbar-brand">Student Hub</h2>
      <ul className="navbar-links">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={location.pathname === '/my-profile' ? 'active' : ''}>
          <Link to="/my-profile">My Profile</Link>
        </li>
        <li className={location.pathname === '/languages' ? 'active' : ''}>
          <Link to="/languages">Languages</Link>
        </li>
        <li className={location.pathname === '/teachers' ? 'active' : ''}>
          <Link to="/teachers">Teachers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
