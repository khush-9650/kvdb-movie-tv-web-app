import React, { useEffect, useState } from "react";
import SideNav from "./Partials/SideNav";
import TopNav from "./Partials/TopNav";
import Header from "./Partials/Header";
import HorizontalCards from "./Partials/HorizontalCards";
import Dropdown from "./Partials/Dropdown";
import Loader from "./Partials/Loader";

function Home() {
  document.title = "KVDB | Homepage";
  const [wallpaper, setwallpaper] = useState("");
  const [trending, settrending] = useState("");
  const [category, setcategory] = useState("all");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;

  const GetHeaderWallpaper = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${category}/day?api_key=${ApiKey}`
    );
    const data = await res.json();

    let randomData =
      data.results[(Math.random() * data.results.length).toFixed()];
    setwallpaper(randomData);
  };

  const GetTrending = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${category}/day?api_key=${ApiKey}`
    );
    const data = await res.json();
    settrending(data.results);
  };
  

  useEffect(() => {
    GetTrending();
    GetHeaderWallpaper();
  }, [category]);
  return wallpaper && trending ? (
    <>
      <SideNav className="hidden sm:block"/>
      <div className="w-[80%] h-full overflow-y-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />
        <div className="sm:p-5 flex justify-between">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Home;
