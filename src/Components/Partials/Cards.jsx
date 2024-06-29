import React from "react";
import { Link } from "react-router-dom";

function Cards({ data, title }) {
  console.log(title);
  return (
    <div className="flex w-full justify-center h-full px-[5%] pt-5 flex-wrap bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative w-[25vh] mr-[5%] mb-[5%] rounded-lg "
        >
          <img
            className="shadow-[8px_17px_38px_8px_rgba(0,0,0,0.9) h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.poster_path || c.profile_path
            }`}
          />
          <h1 className="text-xl text-zinc-300 font-semibold mt-2">
            {" "}
            {c.original_title || c.name || c.original_name || c.title}
          </h1>
          {c.vote_average && (
            <div className="text-white font-semibold text-xl bg-yellow-600 rounded-full h-[6vh] w-[6vh] items-center justify-center flex absolute right-[-10%] bottom-[25%]">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
