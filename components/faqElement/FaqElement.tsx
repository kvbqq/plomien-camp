import React from "react";

import { MdKeyboardArrowDown } from "react-icons/md";

interface faqProps {
  question: String;
  answer: String;
}

export const FaqElement: React.FC<faqProps> = ({ question, answer }) => {
  return (
    <React.Fragment>
      <div className={`w-full flex justify-between items-center`}>
        <h1 className={`font-bold text-xl`}>{question}</h1>
        <MdKeyboardArrowDown size={42} color="#EE3135" />
      </div>
      <p className={`w-full my-5 justify-self-end text-lg`}>{answer}</p>
    </React.Fragment>
  );
};
