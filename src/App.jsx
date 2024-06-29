import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/Contact";
import Home from "./Components/Home";
import MovieDetails from "./Components/MovieDetails";
import Movies from "./Components/Movies";
import Loader from "./Components/Partials/Loader";
import Trailer from "./Components/Partials/Trailer";
import Peoples from "./Components/Peoples";
import PersonDetails from "./Components/PersonDetails";
import Popular from "./Components/Popular";
import Trending from "./Components/Trending";
import TvDetails from "./Components/TvDetails";
import TvShows from "./Components/TvShows";
import Notfound from "./Components/Partials/Notfound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movie" element={<Movies />} />
      <Route path="/tvshows" element={<TvShows />} />
      <Route path="/people" element={<Peoples />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/movie/details/:id" element={<MovieDetails />}>
        <Route path="/movie/details/:id/trailer" element={<Trailer />} />
      </Route>
      <Route path="/tv/details/:id" element={<TvDetails />}>
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
      </Route>
      <Route path="/person/details/:id" element={<PersonDetails />} />
      <Route path="*" element={<Notfound />} />
    </Route>
  )
);
function App() {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
