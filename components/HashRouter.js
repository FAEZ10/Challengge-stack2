
const HashRouter = function (routes, rootElement) {
  this.rootElement = rootElement;
  this.routes = routes;

  const generatePage = () => {
    const path = location.hash.slice(1) || '/';
    let componentInstance;

    if (this.componentInstances.has(path)) {
      componentInstance = this.componentInstances.get(path);
    } else {
      const routeContent = routes[path];
      componentInstance = typeof routeContent === 'function' ? new routeContent() : routeContent;
      this.componentInstances.set(path, componentInstance);
    }

    const element = this.renderStructure(componentInstance.render());
    if (rootElement.firstChild) {
      rootElement.replaceChild(element, rootElement.firstChild);
    } else {
      rootElement.appendChild(element);
    }
  };

  generatePage();
  window.onhashchange = generatePage;
};


export const HashLink = function (props) {
  return {
    type: "a",
    props: {
      href: "#" + props.to,
      onclick: (e) => {
        e.preventDefault();
        window.location.hash = props.to;
      },
    },
    children: [
      {
        type: "TEXT_NODE",
        content: props.title,
      },
    ],
  };
};

export default HashRouter;
