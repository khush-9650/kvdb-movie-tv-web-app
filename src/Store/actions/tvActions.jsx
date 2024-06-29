import { loadtv } from "../reducers/tvSlice";
export { removetv } from "../reducers/tvSlice";
import { ApiKey } from "../../Constants";
import axios from "axios";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${ApiKey}`
    );
    const externalid = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${ApiKey}`
    );
    const recommendations = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${ApiKey}`
    );
    const similar = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${ApiKey}`
    );
    const videos = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${ApiKey}`
    );
    const translations = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/translations?api_key=${ApiKey}`
    );
    const watchproviders = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${ApiKey}`
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

    dispatch(loadtv(theultimatedetails));
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
