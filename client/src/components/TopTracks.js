import React, { useState } from "react";
import apiClient from "../http-common";
import { useQuery } from "@tanstack/react-query";
import { Box, Image, Button } from "@chakra-ui/react";

const getTopTracks = ({ queryKey }) => {
  const [, activeRange] = queryKey;
  return apiClient.get(`me/top/tracks?time_range=${activeRange}_term`);
};

function TopTracks() {
  const [activeRange, setActiveRange] = useState("short");

  const { data, refetch } = useQuery(["topTracks", activeRange], getTopTracks);

  console.log("data", data);

  return (
    <>
      <ul>
        <li>
          <Button onClick={() => setActiveRange("short")}>This Month</Button>
        </li>
        <li>
          <Button onClick={() => setActiveRange("medium")}>
            Last 6 Months
          </Button>
        </li>
        <li>
          <Button onClick={() => setActiveRange("long")}>All Time</Button>
        </li>
      </ul>
      <ul>
        {data?.data?.items.map((track) => (
          <li key={track.id}>
            <div>{track.name}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TopTracks;
