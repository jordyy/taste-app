import { Box, Image } from '@chakra-ui/react';
import React from 'react';

const ArtistGrid = ({ artists }) =>
  artists && artists.length ? (
    <ul>
      {artists.map((artist, i) => (
        <li key={i}>
          <Box>
            {Boolean(artist.album.images?.length) && (
              <Box>
                <Image src={artist.album.images[0].url} alt="{artist.name}" />
              </Box>
            )}
            <h3>{artist.name}</h3>
            <p>{artist.artists[0].name}</p>
          </Box>
        </li>
      ))}
    </ul>
  ) : (
    <p>...seems like you don't listen to music.</p>
  );

export default ArtistGrid;
