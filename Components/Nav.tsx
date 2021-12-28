import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import styles from '../styles/Nav.module.css'

const Nav: NextPage = () => {
  return (
    <nav className={styles.nav}>
      <ul className="ulList">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/createQ">Quiz Center</Link>
        </li>
        {/* <li>Link</li> */}
      </ul>

       
    </nav>
  );
};

export default Nav;
