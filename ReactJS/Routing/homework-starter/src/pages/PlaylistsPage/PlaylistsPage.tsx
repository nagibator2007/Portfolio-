import { ChangeEvent } from "react";
import { PLAYLISTS } from "../../data";
import "./PlaylistsPage.css";
import { Link, useSearchParams } from "react-router-dom";

export function PlaylistsPage() {
	const [searchParam, setSearchParam] = useSearchParams();

	const searchName = searchParam.get("searchName") || "";
	const searchGenre = searchParam.get("searchGenre") || "";

	const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		setSearchParam({ searchGenre: value.toLowerCase(), searchName });
	};

	const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		setSearchParam({ searchName: value.toLowerCase(), searchGenre });
	};

	const filteredPlaylists = PLAYLISTS.filter(({ genre, name }) => {
		const genreMatches =
			searchGenre === "" ||
			(genre.toLowerCase().includes(searchGenre) &&
				genre.toLowerCase() !== "non music");

		const nameMatches =
			searchName === "" || name.toLowerCase().includes(searchName);

		return genreMatches && nameMatches;
	});

	const finalFilteredPlaylists = filteredPlaylists.filter(
		({ genre }) => genre.toLowerCase() !== "non music"
	);

	return (
		<div className="PlaylistsPage">
			<h2>PlaylistsPage</h2>

			<div className="playlists">
				<label>
					введите жанр
					<input type="text" value={searchGenre} onChange={handleSearchGenre} />
				</label>

				<label>
					введите название
					<input type="text" value={searchName} onChange={handleSearchName} />
				</label>

				{finalFilteredPlaylists.map(({ id, name }) => (
					<Link to={`/playlists/${id}`} key={id}>
						- {name}
					</Link>
				))}
			</div>
		</div>
	);
}