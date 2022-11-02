import "./ArtistsGrid.css";

const ArtistsGrid = ({ artists }) =>
  artists && artists.length ? (
    <ul className="parent-grid">
      {artists.map((artist, i) => (
        <li key={i}>
          <div className="grid-cell">
            {Boolean(artist.album.images?.length) && (
              <div className="artist-img-container">
                <img src={artist.album.images[0].url} alt="{artist.name}" />
              </div>
            )}
            <h3 className="card-text">{artist.name}</h3>
            <p className="card-text">{artist.artists[0].name}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No artists available</p>
  );

export default ArtistsGrid;
