import type { Section } from "./section";
import type { Track } from "./track";

export interface Project {
  title: string;
  sections: Section[];
  tracks: Track[];
  settings: {
    tempo: number;
    volume: number;
  };
}
