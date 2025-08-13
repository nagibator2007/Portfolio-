import CustomLayout from "@/components/Layout/Layout";
import AlbumsList from "../../components/AlbumsList/AlbumsList";
import { FC } from "react";

const AlbumsPage: FC = () => {
	return (
		<CustomLayout>
			<div className="page-wrapper">
				<h1>Albums</h1>
				<AlbumsList />
			</div>
		</CustomLayout>
	);
};

export default AlbumsPage;
