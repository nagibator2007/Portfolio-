import { Link, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlayListInfoPage.css";

export function PlaylistInfoPage() {
    const { playlistId } = useParams();
    const playlist = PLAYLISTS[Number(playlistId)];

    if (!playlist) {
        return (
            <div className="playlistInfoPage">
                <h2>PlaylistPage</h2>
                <div className="playlists">
                    <p>Такого плейлиста нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className="playlistInfoPage">
            <h2>PlaylistInfoPage</h2>
            <div className="playlists">
                <p>
                    Жанр: <Link to={`/playlists?searchGenre=${playlist.genre.toLowerCase()}`}>{playlist.genre}</Link>
                </p>
                <p>Название: {playlist.name}</p>
                <div>
                    <h3>Песни:</h3>
                    <ul>
                        {playlist.songs.map((song, index) => (
                            <li key={index}>{song}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}