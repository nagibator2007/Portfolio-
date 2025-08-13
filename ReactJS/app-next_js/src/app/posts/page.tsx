import CustomLayout from "@/components/Layout/Layout";
import PostsList from "../../components/PostsList/PostsList";
import { FC } from "react";

const PostsPage: FC = () => {
	return (
		<CustomLayout>
			<div className="page-wrapper">
				<h1>Posts</h1>
				<PostsList />
			</div>
		</CustomLayout>
	);
};

export default PostsPage;
