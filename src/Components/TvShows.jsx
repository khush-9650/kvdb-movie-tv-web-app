import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { ApiKey } from "../Constants";
import Cards from "./Partials/Cards";
import Dropdown from "./Partials/Dropdown";
import Loader from "./Partials/Loader";
import TopNav from "./Partials/TopNav";

function tvs() {
  const [category, setcategory] = useState("popular");
  const [tv, settv] = useState("");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  // Capitalize the first letter of the category for the document title
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  document.title = "KVDB | Tv Shows " + capitalizeFirstLetter(category);

  const GetTv = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${category}?api_key=${ApiKey}&page=${page}`
    );
    const data = await res.json();
    // settv(data.results);

    if (data.results.length > 0) {
      settv((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setpage(page + 1);
      settv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-zinc-600">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 "
          ></i>
          Tv Shows ({capitalizeFirstLetter(category)})
        </h1>
        <div className="flex w-[80%] items-center">
          <TopNav />
          <Dropdown
            title="Category"
            options={["airing_today", "top_rated", "on_the_air", "popular"]}
            func={(e) => {
              setcategory(e.target.value);
            }}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        loader={<h1>Loading... </h1>}
        hasMore={hasMore}
        next={GetTv}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default tvs;
