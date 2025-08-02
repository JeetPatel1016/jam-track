import type { Chord } from "./chord";

export interface Section {
  id: string;
  name: string;
  chords?: Chord[];
}
