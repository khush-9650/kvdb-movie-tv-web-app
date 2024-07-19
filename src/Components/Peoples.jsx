import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Cards from "./Partials/Cards";
import Dropdown from "./Partials/Dropdown";
import Loader from "./Partials/Loader";
import TopNav from "./Partials/TopNav";
function Peoples() {
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState("");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Capitalize the first letter of the category for the document title
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  document.title = "KVDB | people Shows " + capitalizeFirstLetter(category);

  const GetPeople = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${category}?api_key=${ApiKey}&page=${page}`
    );
    const data = await res.json();
    // setpeople(data.results);

    if (data.results.length > 0) {
      setpeople((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    }
    console.log(data);
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      GetPeople();
    } else {
      setpage(page + 1);
      setpeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-zinc-600">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 "
          ></i>
          people ({capitalizeFirstLetter(category)})
        </h1>
        <div className="flex w-[80%] items-center">
          <TopNav />

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        loader={<h1>Loading... </h1>}
        hasMore={hasMore}
        next={GetPeople}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Peoples;
