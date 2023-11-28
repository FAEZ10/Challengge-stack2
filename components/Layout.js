import { createElement } from "../core/MiniReact.js";
import NavBar from "./NavBar.js";

const Layout = ({ children }) => {
    const processedChildren = Array.isArray(children) ? children : [];

    return createElement('div', null,
        createElement(NavBar, null),
        ...processedChildren
    );
};

export default Layout;
