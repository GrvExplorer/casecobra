"use client";

import Link from "next/link";
import styles from "./links.module.css";
import NavLinks from "./navlinks/NavLinks";
import { useState } from "react";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

// TEMPORARY
const session = true;
const isAdmin = false;

function Links() {

  const [open, setOpen] = useState(false)

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.links}`}>
      {links.map((link) => (
        <NavLinks item={link} key={link.title} />
      ))}

      {session ? (

    <>
    {isAdmin && (
            <NavLinks item={{ title: "Admin", path: "/admin" }} />
    )}
    <button className={styles.logout}>Logout</button>
    </>
      ) : (
        <NavLinks item={{ title: "login", path: "/login" }} />
      )}
      </div>
      <button>Menu</button>
    </div>
  );
}

export default Links;
