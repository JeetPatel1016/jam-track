// Centralized dropdown options for chord editing
import type { Key, Duration } from "@/types";

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

export const CHORD_TYPE_OPTIONS = [
  { value: "maj", label: "maj" },
  { value: "min", label: "min" },
  { value: "7", label: "7" },
  { value: "maj7", label: "maj7" },
  { value: "min7", label: "min7" },
  { value: "dim", label: "dim" },
  { value: "aug", label: "aug" },
  { value: "sus2", label: "sus2" },
  { value: "sus4", label: "sus4" },
  { value: "add9", label: "add9" },
  { value: "6", label: "6" },
  { value: "9", label: "9" },
  { value: "11", label: "11" },
  { value: "13", label: "13" },
];

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
