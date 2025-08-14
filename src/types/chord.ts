import type { CHORD_DEFINITIONS_LOOKUP } from "@/lib/chords/chordDefinitions";

export type Duration =
  | "1/4"
  | "2/4"
  | "3/4"
  | "4/4"
  | "5/4"
  | "6/4"
  | "7/4"
  | "8/4"
  | "9/4"
  | "10/4";

export type Key =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export type Inversion = "Root" | "1st" | "2nd" | "3rd";
export type ChordType = keyof typeof CHORD_DEFINITIONS_LOOKUP;


export type ChordCategory =
  | "triads"
  | "sevenths"
  | "suspended"
  | "added_tone"
  | "sixths"
  | "extended"
  | "altered"
  | "other";

export interface Chord {
  id: string;
  key: Key;
  type: string;
  inversion: Inversion;
  bass: Key;
  duration: string;
}
