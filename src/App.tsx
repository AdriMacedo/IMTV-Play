import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Tv from "./pages/Tv";
import TvDetails from "./pages/TvDetails";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvDetails />} />
      </Routes>
    </div>
  );
}
export default App;
