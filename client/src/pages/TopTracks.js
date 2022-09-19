import { useState, useEffect } from "react";
import { getCurrentUserTopTracks } from "../spotify";
import { catchErrors } from "../utils";
import { ArtistsGrid } from "../Components";
import "../styles/TopTracks.css";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserTopTracks(`${activeRange}_term`);
      setTopTracks(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <ul className="button-container">
        <li>
          <button
            className={activeRange === "short" ? "active" : ""}
            onClick={() => setActiveRange("short")}
          >
            This Month
          </button>
        </li>
        <li>
          <button
            className={activeRange === "medium" ? "active" : ""}
            onClick={() => setActiveRange("medium")}
          >
            Last 6 Months
          </button>
        </li>
        <li>
          <button
            className={activeRange === "long" ? "active" : ""}
            onClick={() => setActiveRange("short")}
          >
            All Time
          </button>
        </li>
      </ul>
      activeRange={activeRange}
      setActiveRange={setActiveRange}
      {topTracks && topTracks.items && (
        <ArtistsGrid artists={topTracks.items} />
      )}
    </main>
  );
};

export default TopTracks;
