// This file contains all the necessary options for dropdowns in chord editing
import type { Key, Duration, ChordCategory } from "@/types";
import { CHORD_DEFINITIONS_LOOKUP } from "./chords/chordDefinitions";

export interface Option<T extends string> {
  value: T;
  label: string;
}

export const KEY_OPTIONS: Option<Key>[] = [
  { value: "C", label: "C" },
  { value: "C#", label: "C# / D♭" },
  { value: "D", label: "D" },
  { value: "D#", label: "D# / E♭" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "F#", label: "F# / G♭" },
  { value: "G", label: "G" },
  { value: "G#", label: "G# / A♭" },
  { value: "A", label: "A" },
  { value: "A#", label: "A# / B♭" },
  { value: "B", label: "B" },
];

// Derive UI options automatically
export const GROUP_ORDER: ChordCategory[] = [
  'triads',
  'sevenths', 
  'suspended',
  'sixths',
  'added_tone',
  'extended'
];




export const CHORD_TYPE_OPTIONS = Object.entries(CHORD_DEFINITIONS_LOOKUP).reduce((acc, [key, def]) => {
  if (!acc[def.category]) acc[def.category] = [];
  acc[def.category].push({ value: key, label: def.label });
  return acc;
}, {} as Record<ChordCategory, Array<{value: string, label: string}>>);

export const INVERSION_OPTIONS = [
  { value: "Root", label: "Root" },
  { value: "1st", label: "1st Inversion" },
  { value: "2nd", label: "2nd Inversion" },
  { value: "3rd", label: "3rd Inversion" },
];

export const DURATION_OPTIONS: Option<Duration>[] = [
  { value: "1/4", label: "1/4" },
  { value: "2/4", label: "2/4" },
  { value: "3/4", label: "3/4" },
  { value: "4/4", label: "4/4" },
  { value: "5/4", label: "5/4" },
  { value: "6/4", label: "6/4" },
  { value: "7/4", label: "7/4" },
  { value: "8/4", label: "8/4" },
  { value: "9/4", label: "9/4" },
  { value: "10/4", label: "10/4" },
];
