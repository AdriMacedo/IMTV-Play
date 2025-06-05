import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./NavBar.scss";
import SearchBar from "../Search/SearchBar";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <nav className="navbar__container">
      <div className="home" aria-label="home button" title="home button">
        <Link to="/">
          <Button variant={"home"}>IMTV</Button>
        </Link>
      </div>
      <div className="links">
        <div className="nav-link movies">
          <Link to="/movies">
            <Button
              variant={"movies"}
              active={location.pathname.startsWith("/movies")}
            >
              MOVIES
            </Button>
          </Link>
        </div>
        <div className="nav-link tv">
          <Link to="/tv">
            <Button variant={"tv"} active={location.pathname.startsWith("/tv")}>
              TV
            </Button>
          </Link>
        </div>
      </div>
      <div className="search">
        <SearchBar onSearch={handleSearch} />
      </div>
    </nav>
  );
}

export default NavBar;
