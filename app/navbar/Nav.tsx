"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { navLinks } from "@/constants/constants";
import { Button } from "@/components/button/Button";
import Logo from "@/public/logo.webp";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

interface NavMenuMobileProps {
  showNav: boolean;
  toggleNav: () => void;
}

const NavLogo = () => {
  return (
    <Link href="/">
      <Image src={Logo} alt={"Płomień Milowice"} className="w-20 min-w-14" />
    </Link>
  );
};

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

const NavMenuMobile: React.FC<NavMenuMobileProps> = ({
  showNav,
  toggleNav,
}) => {
  return (
    <div className={"w-full pb-16 flex-col text-center"}>
      <ul className={"pb-10"}>
        {navLinks.map((item, i) => (
          <li key={i} className={"py-3"}>
            <Link
              href={item.href}
              className={"hover:text-font-white-hover"}
              onClick={toggleNav}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Button
        text="Dołącz do nas"
        href="zapisy"
        style="min-w-48"
        onclick={toggleNav}
      />
    </div>
  );
};

export const Nav = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const [showNav, setNav] = useState(false);

  const toggle = () => {
    setNav(!showNav);
  };
  return (
    <nav className={"w-full absolute flex justify-center z-10"}>
      <div
        className={`h-32 flex items-center ${
          isDesktop ? "justify-center" : "w-[90%] justify-between"
        }`}
      >
        <NavLogo />
        {isDesktop ? (
          <NavMenu />
        ) : (
          <button onClick={toggle}>
            {showNav ? (
              <HiOutlineX size={45} color="#C69A0D" />
            ) : (
              <HiOutlineMenu size={45} color="#C69A0D" />
            )}
          </button>
        )}
        {showNav && !isDesktop ? (
          <NavMenuMobile showNav={showNav} toggleNav={toggle} />
        ) : null}
      </div>
    </nav>
  );
};
