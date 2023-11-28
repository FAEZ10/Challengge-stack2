import { Component, createElement } from "../core/MiniReact.js";
import Button from "../components/Button.js"; // Assurez-vous que Button est correctement importé

// class Page2 extends Component {
//   constructor() {
//     super();
//     this.state = { count: 0 };
//   }


//   render() {
//     return {
//       type: "div",
//       props: { style: { "background-color": "green" } },
//       children: [
//         {
//           type: Button, 
//           props: {
//             onClick: () => alert("Coucou"),
//             title: "Click me",
//           },
//         },
//         {
//           type: "h1",
//           children: [
//             { type: "TEXT_NODE", content: `Count: ${this.state.count}` },
//           ],
//         },
//         {
//           type: Button,
//           props: {
//             onClick: () => {
//               console.log('Button clicked');
//               this.setState({ count: this.state.count + 1 });
//             }, // this.setState({ count: this.state.count + 1 }),
//             title: "Count +1",
//           },
//         },
//       ],
//     };
//   }
// }

// export default Page2;

class Page2 extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  render() {
    return createElement(
      'div', 
      { style: { backgroundColor: 'green' } },
      createElement(
        Button, 
        {
          onClick: () => alert("Coucou"),
          title: "Click me"
        }
      ),
      createElement(
        'h1', 
        null,
        `Count: ${this.state.count}`
      ),
      createElement(
        Button,
        {
          onClick: () => {
            console.log('Button clicked');
            this.setState({ count: this.state.count + 1 });
          },
          title: "Count +1"
        }
      )
    );
  }
}

export default Page2;