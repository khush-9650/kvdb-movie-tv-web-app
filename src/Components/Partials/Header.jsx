import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  const imageUrl = `https://image.tmdb.org/t/p/original/${
    data.backdrop_path || data.profile_path
  }`;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[50vh] flex flex-col items-start justify-end p-[5%]"
    >
      <h1 className="w-[50%] my-3 text-white font-black text-5xl">
        {data.original_title || data.name || data.original_name || data.title}
      </h1>
      <p className="my-1 text-white w-[50%]">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="text-white">
        <i className=" text-yellow-500 mr-2 ri-megaphone-fill"></i>
        {data.release_date || "No Information"}{" "}
        <i className="ml-5 text-yellow-500 mr-2 ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-4 bg-[#6556CD] text-white rounded mt-5 font-semibold">
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
