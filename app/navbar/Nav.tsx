"use client";

import React, { useState, useEffect } from "react";
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

interface NavProps {
  isLanding: boolean;
}

const NavLogo = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  return (
    <Link href="/">
      <Image
        src={Logo}
        alt={"Płomień Milowice"}
        className={`${isDesktop ? "w-20" : "w-16"} min-w-14`}
      />
    </Link>
  );
};

const NavMenu: React.FC<NavProps> = ({ isLanding }) => {
  return (
    <React.Fragment>
      <ul
        className={`${
          isLanding ? "w-[47rem] px-16" : "w-[59rem]"
        } flex items-center justify-end space-x-16`}
      >
        {navLinks.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              className={`font-bold hover:text-font-white-hover ${
                isLanding ? `text-${item.color}` : "text-black"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {isLanding ? (
        <Button text="ZAPISZ SIĘ" href="../#campy" style="min-w-48 font-bold" />
      ) : null}
    </React.Fragment>
  );
};

const NavMenuMobile: React.FC<NavMenuMobileProps> = ({ toggleNav }) => {
  return (
    <div
      className={
        "w-full h-screen absolute inset-0 pb-16 flex flex-col justify-center items-center text-center bg-white -z-10"
      }
    >
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
        text="ZAPISZ SIĘ"
        href="../#campy"
        style="min-w-48"
        onclick={toggleNav}
      />
    </div>
  );
};

export const Nav: React.FC<NavProps> = ({ isLanding }) => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const [showNav, setNav] = useState(false);

  const toggle = () => {
    setNav(!showNav);
  };

  useEffect(() => {
    if (showNav) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showNav]);

  return (
    <nav
      className={`w-full absolute flex justify-center z-20 ${
        !isLanding && !showNav ? "shadow-[0_0_35px_rgba(0,0,0,0.25)]" : null
      }`}
    >
      <div
        className={`flex items-center ${
          isDesktop ? "justify-center h-32" : "w-[90%] h-24 justify-between"
        }`}
      >
        <NavLogo />
        {isDesktop ? (
          <NavMenu isLanding={isLanding} />
        ) : (
          <button onClick={toggle} className={`p-2 bg-custom-red rounded-full`}>
            {showNav ? (
              <HiOutlineX size={32} color="#FFFFFF" />
            ) : (
              <HiOutlineMenu size={32} color="#FFFFFF" />
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
