import React from "react";
import NavBar from "./NavBar";
import Products from "./Products";

function Home(props) {
  return (
    <div>
      <NavBar {...props} />
      <Products {...props} />
    </div>
  );
}

export default Home;
