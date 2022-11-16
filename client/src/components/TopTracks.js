import React, { useState } from "react";
import apiClient from "../http-common";
import { useQuery } from "@tanstack/react-query";
import { Image, Button, SimpleGrid, Text, Box } from "@chakra-ui/react";
import TrackFeatures from "./TrackFeatures";

const getTopTracks = ({ queryKey }) => {
  const [, activeRange] = queryKey;
  return apiClient.get(`me/top/tracks?time_range=${activeRange}_term`);
};

function TopTracks() {
  const [activeRange, setActiveRange] = useState("short");

  const { data, refetch } = useQuery(["topTracks", activeRange], getTopTracks);
  const trackIds =
    '"' + data?.data?.items.map((track) => track.id).join() + '"';

  return (
    <>
      <SimpleGrid columns={3} display="flex" justifyContent="space-around">
        <Box>
          <Button onClick={() => setActiveRange("short")}>This Month</Button>
        </Box>
        <Box>
          <Button onClick={() => setActiveRange("medium")}>
            Last 6 Months
          </Button>
        </Box>
        <Box>
          <Button onClick={() => setActiveRange("long")}>All Time</Button>
        </Box>
      </SimpleGrid>
      <TrackFeatures
        trackIds={{ trackIds: data?.data?.items.map((track) => track.id) }}
      />
      <SimpleGrid columns={4} spacingX="2rem" spacingY="5rem" p="5rem">
        {data?.data?.items.map((track) => (
          <Box key={track.id}>
            <Image boxSize="100%" src={track.album.images[0].url} />
            <Text fontSize="sm" noOfLines={[1]}>
              {track.name}
            </Text>
            <Text fontSize="md" as="b">
              {track.artists[0].name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

export default TopTracks;
