import { Route, Routes } from "react-router-dom";
import TopTracks from "./components/TopTracks";

function Routing() {
  return (
    <Routes>
      <Route path="toptracks" element={<TopTracks />} />
    </Routes>
  );
}

export default Routing;
