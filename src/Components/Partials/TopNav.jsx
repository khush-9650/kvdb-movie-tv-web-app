import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import no_image from "/no_image.jpg";

function TopNav() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

  const getSearches = async (searchQuery) => {
    if (!searchQuery) {
      // If the search query is empty, clear the results
      setSearchResults([]);
      return;
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${ApiKey}&query=${searchQuery}`
    );
    const data = await res.json();
    setSearchResults(data.results); // Update the search results state
    console.log(searchResults);
  };
  useEffect(() => {
    getSearches(query);
  }, [query]);

  return (
    <div className="z-[100] w-full h-[10vh] relative flex justify-center items-center">
      <i className=" text-zinc-400 text-3xl ri-search-line"></i>
      <input
        type="text"
        placeholder="search anything"
        className="mx-10 w-[50%] text-zinc-200 p-5 text-xl outline-none border-none bg-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <i
          className=" text-zinc-400 text-3xl ri-close-fill"
          onClick={(e) => {
            setQuery("");
          }}
        ></i>
      )}

      <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%]  overflow-auto">
        {searchResults.map((item) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold  text-zinc-600 w-[100%] p-8 flex items-center justify-start border-b-2 border-zinc-100"
          >
            <img
              className="w-[12vh] h-[12vh] object-cover rounded-lg mr-5 shadow-lg "
              src={
                item.backdrop_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      item.backdrop_path || item.profile_path
                    }`
                  : no_image
              }
              alt=""
            />
            <span className="text-lg font-semibold">
              {item.original_title ||
                item.name ||
                item.original_name ||
                item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopNav;
