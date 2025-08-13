import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import CusomLayout from "./components/Layout/Layout";
import { lazy, Suspense } from 'react';

// Динамический импорт страниц
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PostsPage = lazy(() => import("./pages/PostsPage/PostsPage"));
const AlbumsPage = lazy(() => import("./pages/AlbumsPage/AlbumsPage"));
const TodoPage = lazy(() => import("./pages/TodoPage/TodoPage"));

// Компонент загрузки (fallback)
const Loading = () => <div>Loading...</div>; // Простой компонент загрузки

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CusomLayout />}>
					{/* Suspense оборачивает каждый lazy-loaded компонент */}
					<Route index path="" element={<Suspense fallback={<Loading />}> <HomePage /> </Suspense>} />
					<Route path="posts" element={<Suspense fallback={<Loading />}> <PostsPage /> </Suspense>} />
					<Route path="albums" element={<Suspense fallback={<Loading />}> <AlbumsPage /> </Suspense>} />
					<Route path="todos" element={<Suspense fallback={<Loading />}> <TodoPage /> </Suspense>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;