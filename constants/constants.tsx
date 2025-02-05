import React from "react";

// ICONS
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { TbHeartPlus } from "react-icons/tb";
import { MdOutlineTrendingUp } from "react-icons/md";
import { MdMood } from "react-icons/md";
import { LiaMedalSolid } from "react-icons/lia";
import { GrTrophy } from "react-icons/gr";
import { MdMoreTime } from "react-icons/md";
import { PiPlant } from "react-icons/pi";

// TYPES
import { SliderElement } from "@/types/types";

export const navLinks = [
  {
    label: "O NAS",
    color: "black",
    href: "#about",
  },
  {
    label: "TURNUSY",
    color: "white",
    href: "#campy",
  },
  {
    label: "GALERIA",
    color: "white",
    href: "#galeria",
  },
  {
    label: "KONTAKT",
    color: "white",
    href: "#kontakt",
  },
];

export const firstSliderElements: SliderElement[] = [
  {
    id: 1,
    icon: <MdOutlineGroups size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        Doświadczona <br /> kadra trenerska
      </React.Fragment>
    ),
  },
  {
    id: 2,
    icon: <MdOutlineSportsVolleyball size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        Rozwój <br /> umiejętności <br /> siatkarskich
      </React.Fragment>
    ),
  },
  {
    id: 3,
    icon: <TbHeartPlus size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        Promowanie <br /> zdrowego <br /> stylu życia
      </React.Fragment>
    ),
  },
  {
    id: 4,
    icon: <MdOutlineTrendingUp size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        Indywidualne <br /> podejście do <br /> każdego zawodnika
      </React.Fragment>
    ),
  },
  {
    id: 5,
    icon: <MdMood size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        Dla dzieci <br /> i młodzieży <br /> w wieku 10-17 lat
      </React.Fragment>
    ),
  },
];

export const secondSliderElements: SliderElement[] = [
  {
    id: 6,
    icon: <LiaMedalSolid size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        10+ medali <br /> młodzieżowych <br /> Mistrzostw Polski
      </React.Fragment>
    ),
  },
  {
    id: 7,
    icon: <GrTrophy size={34} color="#EE3135" />,
    text: (
      <React.Fragment>
        Wielokrotna <br /> mistrzyni Polski
      </React.Fragment>
    ),
  },
  {
    id: 8,
    icon: <MdMoreTime size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        20 lat <br /> doświadczenia <br /> w trenowaniu <br /> młodzieży
      </React.Fragment>
    ),
  },
  {
    id: 9,
    icon: <PiPlant size={42} color="#EE3135" />,
    text: (
      <React.Fragment>
        Gwarantowany <br /> rozwój umiejętności <br /> i charakteru
      </React.Fragment>
    ),
  },
];
