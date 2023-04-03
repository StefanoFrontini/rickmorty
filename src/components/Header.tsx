import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">Rick & Morty DB</Link>
        <ul className="nav-links">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/favorites">favorites</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header;
