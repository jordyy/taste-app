import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Routing from "./Routing";
import { Box, Image, Button, Link } from "@chakra-ui/react";

const spotifyAPI = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyAPI.setAccessToken(spotifyToken);
      localStorage.setItem("accessToken", spotifyToken);
      spotifyAPI.getMe().then((user) => {
        console.log(user);
      });
      setLoggedIn(true);
    }
  }, []);

  const getNowPlaying = () => {
    spotifyAPI.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url,
      });
    });
  };

  return (
    <Box>
      <Routing />
      {!loggedIn && (
        <Link as={Button} href={"http://localhost:8888"}>
          Login to Spotify
        </Link>
      )}
      {loggedIn && (
        <>
          <Box>Now Playing: {nowPlaying.name}</Box>
          <Box>
            <Image src={nowPlaying.albumArt} alt="album art" />
          </Box>
        </>
      )}
      {loggedIn && (
        <Button onClick={() => getNowPlaying()}>Check Now Playing</Button>
      )}
    </Box>
  );
}

export default App;
