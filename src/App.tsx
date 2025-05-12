import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element />
        <Route path="/movies" element />
        <Route path="/tv" element />
        <Route path="/movies/:id" element />
        <Route path="/tv/:id" element />
      </Routes>
    </div>
  );
}
export default App;
