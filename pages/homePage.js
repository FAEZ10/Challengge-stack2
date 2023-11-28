import Layout from '../components/Layout.js';
import { createElement } from "../core/MiniReact.js";

const HomePage = () => {
    return createElement(Layout, null,
        createElement('h1', null, 'Welcome to HomePage'),
    );
};

export default HomePage;