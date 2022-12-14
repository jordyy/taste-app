import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { accessToken } from '../spotifyAuth';
// import ArtistGrid from '../Components/ArtistGrid';
// import { getCurrentUserTopTracks } from '../spotifyAuth';

const fetchTracks = async (
  url = 'https://api.spotify.com/v1/me/top/tracks',
  data = {}
) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
};

const TopTracks = () => {
  // const [range, setRange] = useState('short_term');
  // const [topTracks, setTopTracks] = useState('');

  const { data, status } = useQuery(['tracks'], fetchTracks);

  console.log('data', data);

  return (
    <main>
      {status === 'error' && <p>Error fetching data</p>}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <div>
          {data.map(track => (
            <p key={track.id}>{track.title}</p>
          ))}
        </div>
      )}
      {/* <li>
          <button onClick={() => setRange('short_term')}>This Month</button>
        </li>
        <li>
          <button onClick={() => setRange('medium_term')}>Last 6 Months</button>
        </li>
        <li>
          <button onClick={() => setRange('long_term')}>All Time</button>
        </li> */}

      {/* {topTracks && topTracks.items && <ArtistGrid artists={topTracks.items} />} */}
    </main>
  );
};

export default TopTracks;
