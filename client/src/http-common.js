import axios from "axios";

export default axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-type": "application/json",
  },
});
