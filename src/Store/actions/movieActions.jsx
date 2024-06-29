import { loadmovie } from "../reducers/movieSlice";
export { removemovie } from "../reducers/movieSlice";
import { ApiKey } from "../../Constants";
import axios from "axios";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}`
    );
    const externalid = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${ApiKey}`
    );
    const recommendations = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${ApiKey}`
    );
    const similar = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${ApiKey}`
    );
    const videos = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}`
    );
    const translations = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/translations?api_key=${ApiKey}`
    );
    const watchproviders = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${ApiKey}`
    );

    const theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };

    dispatch(loadmovie(theultimatedetails));
    console.log(theultimatedetails);
  } catch (error) {
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error Request Data:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    console.error("Error Config:", error.config);
  }
};
