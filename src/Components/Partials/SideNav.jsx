import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function SideNav() {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-200 p-10 ">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2 "></i>
        <span> KVDB</span>
      </h1>

      <nav className="text-zinc-400 flex flex-col text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>

        <Link
          to="/trending"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
        >
          <i className="mr-2 ri-fire-fill"></i>Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
        >
          <i className="mr-2 ri-bard-fill"></i>Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-movie-fill"></i>Movies
        </Link>
        <Link to="/tvshows"className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-movie-fill"></i>Tv Shows
        </Link>
        <Link to="/people" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-team-fill"></i>People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 mt-4" />

      <nav className="text-zinc-400 flex flex-col text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Website Information
        </h1>

        <Link to="/aboutus" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-information-fill"></i>About KVDB
        </Link>
        <Link to="/contact" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3">
          <i className="mr-2 ri-phone-fill"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
