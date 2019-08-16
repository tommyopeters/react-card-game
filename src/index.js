import React from "react";
import ReactDOM from "react-dom";

//import scss
import "./sass/main.scss";

//import Components
import Layout from "./components/Layout/Layout";
// import Test from "./test.js";

const App = () => {
  return <Layout />;
};

ReactDOM.render(<App />, document.getElementById("root"));
