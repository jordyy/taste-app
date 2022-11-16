import React, { useState } from "react";
import apiClient from "../http-common";
import { useQuery } from "@tanstack/react-query";
import TopTracks from "./TopTracks";
import { Image, Button, SimpleGrid, Text, Box } from "@chakra-ui/react";

function TrackFeatures(trackIds) {
  const getTrackFeatures = ({ queryKey }) => {
    const [, trackIds] = queryKey;
    return apiClient.get(
      `/audio-features?ids='5V0hwPnZnYroTZN7ZhZE2J,6aNSVZ67jaKhFkStXmKQzO,4hUNk04wpQu0jFfrq6zQna,1rNgLcVhVTTKKmHBH8nQlt,1sEzuZNasuG8s1OOHwYfN2,4wNM9vSBzotBHn0R0fTkY5,4qvPp0Lt3MWWwHVb72Taox,6slPnoB1GjP34FOEPdgOxL,4W9m85S5mNmbeHnhtnB9H8,6tPA07JAS9p9mEOVhLdFJp,7ArU1U22qrYZbjFgUDzN5S,3tUJq43sUSw2zasgNjRY7S,68SAtRseJXXxvXCXhQK71o,6YQ7aPJhk0MGpwoKfFAEbS,0xxZY5C9xxij3D1HkzbnfC,0aVM2DspPoHNTDBm7ehySx,01YROQCnF1AQm7SCWJmD2o,1QvaZ3Yo4KmLvFTa0Y8mim,1VgPjz1kxJefF00tEkLbBZ,1ytLOX3vtOnLoXtXW2Ubo8'`
    );
  };
  const { data, refetch } = useQuery(["trackFeatures"], getTrackFeatures);

  console.log(
    "all of the Data",
    data?.data?.audio_features.slice(1).map((track) => track)
  );

  return (
    <>
      {/* <SimpleGrid columns={4} spacingX="2rem" spacingY="5rem" p="5rem">
        {data?.data?.audio_features.slice(1).map((track) => (
          <Box key={track.id}>
            <Text fontSize="sm">
              {track.acousticness}
              {track.danceability}
              {track.energy}
              {track.instrumentalness}
              {track.liveness}
              {track.loudness}
              {track.speachiness}
              {track.tempo}
              {track.valence}
            </Text>
          </Box>
        ))}
      </SimpleGrid> */}
    </>
  );
}

export default TrackFeatures;
