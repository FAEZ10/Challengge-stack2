const BrowserRouter = function (routes, rootElement) {
  this.rootElement = rootElement;
  this.routes = routes;
  this.componentInstances = new Map(); 

 const generatePage = () => {
  const path = location.pathname;
  let componentInstance;

  if (!this.routes.hasOwnProperty(path)) {
    console.error(`No route defined for path: ${path}`);
    return;
  }

  const routeContent = this.routes[path];

  if (this.componentInstances.has(path)) {
    componentInstance = this.componentInstances.get(path);
  } else {
    if (typeof routeContent === 'function') {
      if (routeContent.prototype && routeContent.prototype.render) {
        try {
          componentInstance = new routeContent();
        } catch (error) {
          console.error(`Error creating instance of component for path: ${path}`, error);
          return;
        }
      } else {
        componentInstance = { render: () => routeContent() };
      }
    } else {
      console.error(`Invalid route content for path: ${path}`);
      return;
    }
    this.componentInstances.set(path, componentInstance);
  }

  try {
    const element = this.renderStructure(componentInstance.render());
    if (this.rootElement.firstChild) {
      this.rootElement.replaceChild(element, this.rootElement.firstChild);
    } else {
      this.rootElement.appendChild(element);
    }
  } catch (error) {
    console.error(`Error rendering component for path: ${path}`, error);
  }
};

  

  generatePage();

  const oldPushState = history.pushState;
  history.pushState = function (state, title, url) {
    oldPushState.call(history, state, title, url);
    generatePage();
  };

  window.onpopstate = generatePage;
};

export const BrowserLink = function (props) {
  return {
    type: "a",
    props: {
      href: props.to,
    },
    events: {
      click: [
        function (event) {
          event.preventDefault();
          history.pushState(null, null, props.to);
        },
      ],
    },
    children: [
      {
        type: "TEXT_NODE",
        content: props.title,
      },
    ],
  };
};

export default BrowserRouter;
