import type { Section } from "./section";

export interface Project {
  title: string;
  sections: Section[];
  settings: {
    tempo: number;
    volume: number;
  };
}
