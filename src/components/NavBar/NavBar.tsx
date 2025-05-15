import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">IMTV</Link>
        </li>
        <li>
          <Link to="/movies">MOVIES</Link>
        </li>
        <li>
          <Link to="/tv">TV</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
