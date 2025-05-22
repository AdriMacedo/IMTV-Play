import { Link } from "react-router-dom";
import Button from "../Button/Button";

function NavBar() {
  return (
    <nav className="navbar__container">
      <div className="home">
        <Link to="/">
          <Button variant={"home"}>IMTV</Button>
        </Link>
      </div>
      <div className="links">
        <Link to="/movies">
          <Button variant={"movies"}>MOVIES</Button>
        </Link>
        <Link to="/tv">
          <Button variant={"tv"}>TV</Button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
