import React from "react";
import type { NextPage } from "next";
import Nav from "./Nav";

const Layout: NextPage = ({ children }) => {
  return (
    <div>
        <Nav />
      <header>
        <p>Welcome to my Quizz</p>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
