import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movies" element={<Movies/>} />
        <Route path="/tv" element />
        <Route path="/movie/:id" element={<MovieDetails/>} />
        <Route path="/tv/:id" element />
      </Routes>
    </div>
  );
}
export default App;
