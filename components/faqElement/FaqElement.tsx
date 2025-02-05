"use client";

import React, { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface faqProps {
  question: String;
  answer: String;
}

export const FaqElement: React.FC<faqProps> = ({ question, answer }) => {
  const [showAnsw, setAnsw] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  const toggle = () => {
    setAnsw(!showAnsw);
  };

  return (
    <React.Fragment>
      <div className={`w-full mb-5 flex justify-between items-center`}>
        <h1
          className={`${
            isDesktop ? "text-xl" : "text-medium"
          } w-auto font-bold`}
        >
          {question}
        </h1>
        <button className={`w-[42px] cursor-pointer`} onClick={toggle}>
          {showAnsw ? (
            <MdKeyboardArrowUp size={42} color="#EE3135" />
          ) : (
            <MdKeyboardArrowDown size={42} color="#EE3135" />
          )}
        </button>
      </div>
      <p
        className={`${
          showAnsw ? "w-full mb-5 justify-self-end text-lg" : "hidden"
        }`}
      >
        {answer}
      </p>
    </React.Fragment>
  );
};
