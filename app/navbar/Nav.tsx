"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { navLinks } from "@/constants/constants";
import { Button } from "@/components/button/Button";
import Logo from "@/public/logo.webp";

const NavLogo = () => {
  return (
    <Link href="/">
      <Image src={Logo} alt={"Płomień Milowice"} className="w-20 min-w-14" />
    </Link>
  );
};

//

const NavMenu = () => {
  return (
    <React.Fragment>
      <ul
        className={"w-[47rem] flex items-center justify-end space-x-16 px-16"}
      >
        {navLinks.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              className={`font-bold hover:text-font-white-hover text-${item.color}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Button text="ZAPISZ SIĘ" href="zapisy" style="min-w-48 font-bold" />
    </React.Fragment>
  );
};

export const Nav = () => {
  return (
    <nav className={"w-full absolute z-10"}>
      <div className={`h-32 flex items-center justify-center`}>
        <NavLogo />
        <NavMenu />
      </div>
    </nav>
  );
};
