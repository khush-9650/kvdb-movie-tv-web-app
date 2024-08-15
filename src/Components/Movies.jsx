import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Cards from "./Partials/Cards";
import Dropdown from "./Partials/Dropdown";
import Loader from "./Partials/Loader";
import TopNav from "./Partials/TopNav";

function Movies() {
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState("");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Capitalize the first letter of the category for the document title
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  document.title = "KVDB | Movies " + capitalizeFirstLetter(category);

  const GetMovie = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${ApiKey}&page=${page}`
    );
    const data = await res.json();
    // setmovie(data.results);

    if (data.results.length > 0) {
      setmovie((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setpage(page + 1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-zinc-600 sm:flex hidden">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 "
          ></i>
          Movies ({capitalizeFirstLetter(category)})
        </h1>
        <div className="flex w-[80%] items-center">
          <TopNav />
          <div className="sm:inline-block hidden">
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              func={(e) => {
                setcategory(e.target.value);
              }}
            />
          </div>
          <div className="w-[2%]"></div>

        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        loader={<h1>Loading... </h1>}
        hasMore={hasMore}
        next={GetMovie}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Movies;
