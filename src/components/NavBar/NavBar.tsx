import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import "./NavBar.scss";

function NavBar() {


  const location = useLocation();
  return (
    <nav className="navbar__container">
      <div className="home">
        <Link to="/">
          <Button variant={"home"}>IMTV</Button>
        </Link>
      </div>
      <div className="links">
        <div className="nav-link movies">

        <Link to="/movies">
          <Button variant={"movies"}  active={location.pathname.startsWith("/movies")}>MOVIES</Button>
        </Link>
        </div>
        <div className="nav-link tv">

        <Link to="/tv">
          <Button variant={"tv"} active={location.pathname.startsWith("/tv")}>TV</Button>
        </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
