import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




function ContactUs() {
  const [wallpaper, setWallpaper] = useState("");
  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_TMDB_API_KEY;
  console.log(ApiKey);
  document.title = "KVDB | Contact Us";


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
        backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || wallpaper.profile_path
          })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="absolute flex w-screen flex-col items-center justify-center min-h-screen bg-[#1F1E24] text-white p-5"
    >
      <div className="absolute top-[5%] px-[5%] w-full flex justify-between items-center">
        <h1 className="text-2xl  font-semibold text-white">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2"
          ></i>
          Contact Us
        </h1>
      </div>
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg max-w-2xl text-center mb-4">
        We would love to hear from you! Whether you have a question about
        features, trials, pricing, need a demo, or anything else, our team is
        ready to answer all your questions.
      </p>
      <p className="text-lg max-w-2xl text-center mb-4 ">
        You can reach out to us via email at{" "}
        <a href="mailto:support@kvdb.com" className="text-[#6556CD]">
          support@kvdb.com
        </a>{" "}
        or call us at{" "}
        <a href="tel:+123456789" className="text-[#6556CD]">
          +123-456-789
        </a>
        . We are available from Monday to Friday, 9AM - 6PM.
      </p>
      <p className="text-lg max-w-2xl text-center mb-4 ">
        Follow us on social media for the latest updates and news:
      </p>
      <div className="flex space-x-4 ">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6556CD] text-2xl"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6556CD] text-2xl"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6556CD] text-2xl"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6556CD] text-2xl"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default ContactUs;
