import { Route, Routes } from "react-router-dom";
import TopTracks from "./components/TopTracks";
import TrackFeatures from "./components/TrackFeatures";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path="toptracks" element={<TopTracks />} />
        <Route path="trackfeatures" element={<TrackFeatures />} />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  return (
    <Flex justifyContent="space-around">
      <Box maxWidth="1440px" px="5rem" m="5rem">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Routing;
