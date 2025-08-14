// This file contains all the necessary chord definitions and lookups.
// This record maps will be used by pattern engine to generate Tone.Part and UI to display chords types.

import type { ChordCategory } from "@/types";

type ChordLookup = {
  intervals: number[];
  label: string;
  category: ChordCategory;
};

export const CHORD_DEFINITIONS_LOOKUP: Record<string, ChordLookup> = {
  maj: {
    intervals: [0, 4, 7],
    label: "Major",
    category: "triads",
  },
  min: {
    intervals: [0, 3, 7],
    label: "Minor",
    category: "triads",
  },
  "7": {
    intervals: [0, 4, 7, 10],
    label: "Dominant 7th",
    category: "sevenths",
  },
  maj7: {
    intervals: [0, 4, 7, 11],
    label: "Major 7th",
    category: "sevenths",
  },
  min7: {
    intervals: [0, 3, 7, 10],
    label: "Minor 7th",
    category: "sevenths",
  },
  dim: {
    intervals: [0, 3, 6],
    label: "Diminished",
    category: "triads",
  },
  aug: {
    intervals: [0, 4, 8],
    label: "Augmented",
    category: "triads",
  },
  sus2: {
    intervals: [0, 2, 7],
    label: "Suspended 2nd",
    category: "suspended",
  },
  sus4: {
    intervals: [0, 5, 7],
    label: "Suspended 4th",
    category: "suspended",
  },
  add9: {
    intervals: [0, 4, 7, 14],
    label: "Add 9th",
    category: "added_tone",
  },
  "6": {
    intervals: [0, 4, 7, 9],
    label: "Major 6th",
    category: "sixths",
  },
  "9": {
    intervals: [0, 4, 7, 10, 14],
    label: "Dominant 9th",
    category: "extended",
  },
  "11": {
    intervals: [0, 4, 7, 10, 14, 17],
    label: "Dominant 11th",
    category: "extended",
  },
  "13": {
    intervals: [0, 4, 7, 10, 14, 21],
    label: "Dominant 13th",
    category: "extended",
  },
} as const;
