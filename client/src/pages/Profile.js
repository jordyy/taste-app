import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getCurrentUserProfile, getCurrentUserTopTracks } from "../spotify";
import { ArtistsGrid } from "../Components";
import { TopTracks } from "../pages";
import "../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userTopTracks = await getCurrentUserTopTracks();
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <div>
          <h1>lol it's {profile.display_name}'s top tracks</h1>
        </div>
      )}
      <div>
        <TopTracks />
      </div>
      {topTracks && (
        <main>
          <ArtistsGrid artists={topTracks.items.slice(0, 10)} />
        </main>
      )}
    </>
  );
};

export default Profile;
