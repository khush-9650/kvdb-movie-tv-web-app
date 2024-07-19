import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const [wallpaper, setWallpaper] = useState("");
  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
  document.title = "KVDB | About Us";

  const getHeaderWallpaper = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${ApiKey}`
      );
      const data = await res.json();

      const randomIndex = Math.floor(Math.random() * data.results.length);
      setWallpaper(data.results[randomIndex]);
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  useEffect(() => {
    getHeaderWallpaper();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          wallpaper.backdrop_path || wallpaper.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex w-screen flex-col items-center justify-center min-h-screen bg-[#1F1E24] text-white p-5"
    >
      <div className="absolute top-[5%] px-[5%] w-full flex justify-between items-center">
        <h1 className="text-2xl  font-semibold text-white">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 "
          ></i>
          About Us
        </h1>
      </div>
      <h1 className="text-4xl font-bold mb-4">About KVDB</h1>
      <p className="text-lg max-w-2xl text-center mb-4">
        Welcome to KVDB, your ultimate destination for exploring and discovering
        the most popular movies and TV shows. Our application leverages the
        powerful TMDB API to provide you with up-to-date information on the
        latest and greatest in the world of entertainment.
      </p>
      <p className="text-lg max-w-2xl text-center mb-4">
        Whether you are a movie enthusiast or a TV series binge-watcher, KVDB
        has something for everyone. Dive into our extensive database to find
        details about your favorite titles, explore new releases, and keep track
        of what's trending. We aim to bring you an intuitive and enjoyable
        browsing experience.
      </p>
      <p className="text-lg max-w-2xl text-center mb-4">
        At KVDB, we are passionate about entertainment and strive to be your
        go-to source for all things movies and TV shows. Thank you for choosing
        KVDB!
      </p>
    </div>
  );
}

export default AboutUs;
