import { createElement } from "../core/MiniReact.js";
import { BrowserLink } from "./BrowserRouter.js";

const NavBar = () => {
    return createElement('nav', { style: { marginBottom: '20px' } },
        createElement('ul', { style: { listStyleType: 'none', padding: 0 } },
            createElement('li', { style: { display: 'inline', marginRight: '10px' } },
                createElement(BrowserLink, { to: '/', title: 'Home' })
            ),
            createElement('li', { style: { display: 'inline', marginRight: '10px' } },
                createElement(BrowserLink, { to: '/page2', title: 'About' })
            ),
            createElement('li', { style: { display: 'inline', marginRight: '10px' } },
                createElement(BrowserLink, { to: '/contact', title: 'Contact' })
            ),
        )
    );
};

export default NavBar;
