"use client";

import Link from "next/link";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export const ContactFooter = () => {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  return (
    <footer id="kontakt" className={"py-20 flex justify-center bg-custom-blue"}>
      <article
        className={`flex px-8 text-white ${
          isDesktop
            ? "w-[66rem] justify-center space-x-20"
            : "w-full flex-col space-y-10"
        }`}
      >
        <div
          className={`${
            isDesktop
              ? "flex justify-between"
              : "flex flex-col-reverse space-y-reverse space-y-10"
          }`}
        >
          <div className={"flex flex-col space-y-2"}>
            <h1 className={"mb-3 text-xl font-semibold"}>Kontakt</h1>
            <p className={"flex items-center font-semibold tracking-wider"}>
              <MdOutlinePhone
                size={28}
                color="#C69A0D"
                style={{ marginRight: 10 }}
              />
              724 363 638
            </p>
            <p className={"flex items-center font-semibold tracking-wider"}>
              <MdOutlinePhone
                size={28}
                color="#C69A0D"
                style={{ marginRight: 10 }}
              />
              505 518 713
            </p>
            <p
              className={`flex items-center font-semibold tracking-wider ${
                isDesktop ? null : ""
              }`}
            >
              <MdOutlineEmail
                size={28}
                color="#C69A0D"
                style={{ marginRight: 10 }}
              />
              kontakt@plomiencamp.pl
            </p>
          </div>
          {/* <div>
            <h1 className={"mb-5 text-xl font-semibold"}>Social Media</h1>
            <div className={"flex items-center space-x-3"}>
              <Link href={"https://www.facebook.com/akademiaplomienmilowice"}>
                <FaFacebookSquare size={28} color="#C69A0D" />
              </Link>
              <Link href={"https://www.instagram.com/plomien.milowice"}>
                <FaInstagram size={28} color="#C69A0D" />
              </Link>
            </div>
          </div> */}
        </div>
        <div className={`flex  ${isDesktop ? "space-x-20" : "space-x-12"}`}>
          <div>
            <h1 className={"mb-5 text-xl font-semibold"}>Obozy</h1>
            <div className={"flex flex-col space-y-2 font-thin text-sm"}>
              <Link href={"/turnusy"}>Turnusy</Link>
              <Link href={"/about"}>O nas</Link>
              <Link href={"/galeria"}>Galeria</Link>
            </div>
          </div>
          <div>
            <h1 className={"mb-5 text-xl font-semibold"}>Dokumenty</h1>
            <div className={"flex flex-col space-y-2 font-thin text-sm"}>
              <Link href={"/regulamin"}>Regulamin</Link>
              <Link href={"/polityka-prywatnosci"}>Polityka prywatności</Link>
              <Link
                href={
                  "../Akademia Siatkówki Płomień Milowice - Standardy Ochrony Małoletnich.pdf"
                }
              >
                Standardy Ochrony Małoletnich
              </Link>
            </div>
          </div>
        </div>
      </article>
    </footer>
  );
};
