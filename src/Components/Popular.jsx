import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { ApiKey } from "../Constants";
import Cards from "./Partials/Cards";
import Dropdown from "./Partials/Dropdown";
import Loader from "./Partials/Loader";
import TopNav from "./Partials/TopNav";

function Popular() {
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState("");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();
  // Capitalize the first letter of the category for the document title
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  document.title = "KVDB | Popular " + capitalizeFirstLetter(category);

  const GetPopular = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${category}/popular?page=${page}&api_key=${ApiKey}`
    );
    const data = await res.json();
    // setpopular(data.results);

    if (data.results.length > 0) {
      setpopular((prevState) => [...prevState, ...data.results]);
      setpage(page + 1);
    }
    console.log(data);
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(page + 1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full flex justify-between items-center">
        <h1 className="text-2xl  font-semibold text-zinc-600">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 "
          ></i>
          Popular ({capitalizeFirstLetter(category)})
        </h1>
        <div className="flex w-[80%] items-center">
          <TopNav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => {
              setcategory(e.target.value);
            }}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        loader={<h1>Loading... </h1>}
        hasMore={hasMore}
        next={GetPopular}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Popular;
