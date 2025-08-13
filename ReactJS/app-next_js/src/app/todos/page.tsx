import { FC } from "react";
import TodosList from "../../components/TodosList/TodosList";
import CustomLayout from "@/components/Layout/Layout";

const TodoPage: FC = () => {
	return (
		<CustomLayout>
			<div className="page-wrapper">
				<h1>Todos</h1>
				<TodosList />
			</div>
		</CustomLayout>
	);
};

export default TodoPage;
