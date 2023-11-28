import HashRouter from "../components/HashRouter.js";
import BrowserRouter from "../components/BrowserRouter.js";

const MiniReactDom = {
  rootElement: null,
  routes: null,
  componentInstances: new Map(),

  render: function (rootElement, routes) {
    this.rootElement = rootElement;
    this.routes = routes;
    BrowserRouter.bind(this)(routes, rootElement);
  },

  update: function () {
    const path = location.pathname;
    const routeContent = this.routes[path];
    if (routeContent) {
      let componentInstance;
      if (this.componentInstances.has(path)) {
        componentInstance = this.componentInstances.get(path);
      } else {
        componentInstance = typeof routeContent === 'function' ? new routeContent() : routeContent;
        this.componentInstances.set(path, componentInstance);
      }
      const element = this.renderStructure(componentInstance.render());
      if (this.rootElement.firstChild) {
        this.rootElement.replaceChild(element, this.rootElement.firstChild);
      } else {
        this.rootElement.appendChild(element);
      }
    }
  },

  renderStructure: function generateDom(structure) {
    if (typeof structure.type === "function") {
      let componentInstance;
      if (structure.type.prototype && structure.type.prototype.render) {
        componentInstance = new structure.type(structure.props);
      } else {
        componentInstance = { render: () => structure.type(structure.props) };
      }
      const componentRendered = componentInstance.render();
      return this.renderStructure(componentRendered);
    }
  
    let element;
    if (typeof structure.type === "string") {
      if (structure.type === "TEXT_NODE") {
        return document.createTextNode(structure.content);
      }
      element = document.createElement(structure.type);
  
      if (structure.props) {
        for (const propName in structure.props) {
          if (propName === "style") {
            Object.assign(element.style, structure.props[propName]);
          } else if (propName.startsWith("data-")) {
            element.dataset[propName.replace("data-", "")] = structure.props[propName];
          } else if (propName === "onclick") {
            element.addEventListener("click", structure.props[propName]);
          } else {
            element.setAttribute(propName, structure.props[propName]);
          }
        }
      }
  
      if (structure.events) {
        for (const eventName in structure.events) {
          for (const eventListener of structure.events[eventName]) {
            element.addEventListener(eventName, eventListener);
          }
        }
      }
  
      if (structure.children) {
        structure.children.forEach(child => {
          const childElement = this.renderStructure(child);
          if (childElement) {
            element.appendChild(childElement);
          }
        });
      }
    }
  
    return element;
  },
  
};

export default MiniReactDom;
