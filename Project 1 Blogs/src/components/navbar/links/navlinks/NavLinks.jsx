"use client";

import Link from "next/link";
import React from "react";
import styles from "./navLinks.module.css";
import { usePathname } from "next/navigation";

function NavLinks({ item }) {

  const pathName = usePathname();

  return (
    <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>
      {item.title}
    </Link>
  );
}

export default NavLinks;
