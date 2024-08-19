import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "../Store/actions/movieActions";
import Loader from "../Components/Partials/Loader";
import HorizonalCards from "./Partials/HorizontalCards";

function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-screen sm:h-[200vh] h-full px-[10%] "
    >
      {/* part 1 navigation */}
      <nav className=" h-[10vh] w-full text-zinc-100 flex gap-10 text-xl items-center">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line mr-2 "
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* part 2 Poster and details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_8px_rgba(0,0,0,0.9) h-[40vh]  object-cover rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path ||
            info.detail.c.poster_path ||
            info.detail.c.profile_path
          }`}
        />

        <div className="content ml-[5%] text-white ">
          <h1 className="text-5xl  font-black ">
            {info.detail.original_title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.title}{" "}
            <small className="text-xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <div className="mt-3 mb-5 flex  items-center  gap-x-3">
            <span className="text-white font-semibold text-xl bg-yellow-600 rounded-full h-[6vh] w-[6vh] items-center justify-center flex ">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1> ({info.detail.release_date})</h1>
            <h1> ({info.detail.genres.map((g) => g.name).join(", ")})</h1>
            <h1> ({info.detail.runtime}min)</h1>
          </div>
          <h1 className="text-xl font-semibold italic ">
            {info.detail.tagline}
          </h1>
          <h1 className="text-xl mt-5 mb-3  ">Overview</h1>
          <p>{info.detail.overview}</p>{" "}
          <h1 className="text-xl mt-5 mb-3  ">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>
          <Link
            className="rounded-lg p-5 font-semibold text-lg bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-2xl mr-1"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3 Platforms */}
      <div className="w-[80%] mb-7 flex  flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 text-white">
            <h1>Available on Flatrate</h1>
            {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 text-white items-center">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 text-white items-center">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Recomandations and similarities */}
      <hr className="h-[2px] border-none bg-zinc-500"/>
      <h1 className="text-3xl mt-10 text-white font-bold mb-5">Recommendations & Similar Stuff</h1>
      <HorizonalCards
        data={info.recommendations ? info.recommendations : info.similar}
      />
      <Outlet/>
    </div>
  ) : (
    <Loader />
  );
}

export default MovieDetails;
