import type { TrackType } from "@/types";
import type { ReactElement } from "react";

import { FaDrum, FaGuitar } from "react-icons/fa6";
import { GiGuitarBassHead, GiGuitar, GiViolin } from "react-icons/gi";
import { RiKeyboardBoxLine } from "react-icons/ri";
import { FaSlidersH } from "react-icons/fa";
import { Piano } from "lucide-react";

export const TRACK_TYPE: Record<
  TrackType,
  { displayName: string; icon: ReactElement }
> = {
  "Acoustic Guitar": {
    displayName: "Acoustic Guitar",
    icon: <FaGuitar size={16} />,
  },
  "Electric Guitar": {
    displayName: "Electric Guitar",
    icon: <GiGuitar size={16} />,
  },
  Bass: {
    displayName: "Bass",
    icon: <GiGuitarBassHead size={16} />,
  },
  Drums: {
    displayName: "Drums",
    icon: <FaDrum size={16} />,
  },
  Keys: {
    displayName: "Keys",
    icon: <RiKeyboardBoxLine size={16} />,
  },
  Piano: {
    displayName: "Piano",
    icon: <Piano size={16} />,
  },
  Synth: {
    displayName: "Synth",
    icon: <FaSlidersH size={16} />,
  },
  Strings: {
    displayName: "Strings",
    icon: <GiViolin size={16} />,
  },
};
