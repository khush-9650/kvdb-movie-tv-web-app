import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function HorizontalCards({ data }) {
  return (
    <div className="w-[100%]  flex overflow-y-hidden mb-5 ">
      {data.length > 0 ? (
        data.map((d, index) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            className="min-w-[15%] h-[50vh] mr-5 mb-5 bg-zinc-900 "
            key={index}
          >
            <img
              className="w-full h-[45%] object-cover "
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              }`}
            />
            <div className="text-white h-[55%] p-3 overflow-y-auto">
              <h1 className=" font-semibold  text-lg ">
                {d.name || d.title || d.original_title || d.original_name}
              </h1>
              <p className="text-sm  mt-1 mb-3">
                {d.overview.slice(0, 80)}...
                <Link className="text-zinc-400">more</Link>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-4xl font-black text-white text-center">Nothing to Show</h1>
      )}
    </div>
  );
}

export default HorizontalCards;
