import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Player from "./pages/Player";
import Footer from "./components/Footer";
import Tv from "./pages/Tv";
import SeriesPlayer from "./pages/SeriesPlayer";
import SeriesDetails from "./pages/SeriesDetails";

const App = () => {
  return (
    <>
      <div className="text-white px-4 sm:px-[1vw] md:px-[3vw] lg:px-[5vw] bg-[#060c15] min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Tv />} />
          <Route path="/movies/:id" element={<Player />} />
          <Route path="/series/:id" element={<SeriesDetails />} />
          <Route
            path="/series/:id/season/:seasonNumber"
            element={<SeriesPlayer />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
