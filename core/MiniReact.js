import MiniReactDom from "./MiniReactDom.js";
export const createElement = function (type, props, ...children) {
    const processedChildren = children.flat().map(child => 
        typeof child === 'string' || typeof child === 'number'
            ? { type: 'TEXT_NODE', content: child.toString() }
            : child
    );

    const processedProps = {};
    if (props) {
        for (const prop in props) {
            processedProps[prop] = props[prop];
        }
    }

    return { type, props: processedProps, children: processedChildren };
};

export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        MiniReactDom.update();
    }

    render() {
       
    }
}

