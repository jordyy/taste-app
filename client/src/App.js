import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Routing from "./Routing";
import { Box, Image, Flex, Button, Text, Link } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
// import { Link } from "react-router-dom";
import TopTracks from "./components/TopTracks";

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
    <>
      <Flex justifyContent="space-between">
        <Routing />
        {!loggedIn && (
          <Button as={Link} href="http://localhost:8888/login">
            Login to Spotify
          </Button>
        )}
        {loggedIn && (
          <>
            <Box display="flex" alignItems="flex-end">
              <Image boxSize="80px" src={nowPlaying.albumArt} alt="album art" />
              <Button onClick={() => getNowPlaying()}>
                <RepeatIcon />
              </Button>
              <Text fontSize="1xl">Now Playing: {nowPlaying.name}</Text>
            </Box>
          </>
        )}
      </Flex>
      <TopTracks />
    </>
  );
}

export default App;
