import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiKey } from "../Constants";
import Cards from "./Partials/Cards";
import Dropdown from "./Partials/Dropdown";
import Loader from "./Partials/Loader";
import TopNav from "./Partials/TopNav";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {


  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState("");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  // Capitalize the first letter of the category for the document title
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  document.title = "KVDB | Trending " + capitalizeFirstLetter(category);

  const GetTrending = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${category}/${duration}?page=${page}&api_key=${ApiKey}`
    );
    const data = await res.json();
    // settrending(data.results);

    if (data.results.length > 0) {
      settrending((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(page + 1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-zinc-600">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 "
          ></i>
          Trending ({capitalizeFirstLetter(category)})
        </h1>
        <div className="flex w-[80%] items-center">
          <TopNav />
          <Dropdown
            title="Category"
            options={["all", "movie", "tv"]}
            func={(e) => {
              setcategory(e.target.value);
            }}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["day", "week"]}
            func={(e) => {
              setduration(e.target.value);
            }}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        loader={<h1>Loading... </h1>}
        hasMore={hasMore}
        next={GetTrending}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Trending;
