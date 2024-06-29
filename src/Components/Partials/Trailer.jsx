import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Notfound from "./Notfound";
function Trailer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);

  return (
    <div className="absolute  top-0 left-0 z-[1000] w-screen text-white bg-[rgba(0,0,0,.8)] h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute top-[5%] right-[5%] text-4xl text-white hover:text-[#6556CD] ri-close-fill mr-2 "
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          height={500}
          width={1000}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
}

export default Trailer;
