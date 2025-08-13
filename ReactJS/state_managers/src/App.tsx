import { Counter } from './features/counter/Counter';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { selectTheme, toggleTheme } from './components/theme/themeSlice'; // Путь до themeSlice
import './App.css';

function App() {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  return (
    <div className={`App ${theme}`}>
      <h1>Переключатель темы</h1>
      <button className="theme-button" onClick={() => dispatch(toggleTheme())}>
        Переключить тему ({theme === 'light' ? 'Светлая' : 'Темная'})
      </button>
      <Counter />
    </div>
  );
}

export default App;