import ReactDOM from 'react-dom/client';
import ProductsList from './ProductsList';
import './main.css';

const reactRoot = ReactDOM.createRoot(document.getElementById('root'));

function renderApp() {
    reactRoot.render(<ProductsList />);
}

renderApp();