// Lookup table for patterns mapped to each track type
import type { TrackType } from "@/types";

export const TRACK_TYPE_PATTERNS: Record<TrackType, string[]> = {
  "Acoustic Guitar": ["strum", "arpeggio", "mute"],
  "Electric Guitar": ["riff", "lead", "chord"],
  "Bass": ["walk", "slap", "pick"],
  "Drums": ["rock", "jazz", "funk"],
  "Keys": ["pad", "lead", "rhythm"],
  "Piano": ["ballad", "classical", "pop"],
  "Synth": ["pluck", "pad", "bass"],
  "Strings": ["legato", "staccato", "pizzicato"],
};

// Optionally, you can export a list of all patterns for reference
export const ALL_PATTERNS = Array.from(
  new Set(Object.values(TRACK_TYPE_PATTERNS).flat())
);

// Simple blueprint for all patterns
export interface PatternBlueprint {
  id: string;
  displayName: string;
}

export const PATTERN_BLUEPRINTS: Record<string, PatternBlueprint> = {
  strum: { id: "strum", displayName: "Strum" },
  arpeggio: { id: "arpeggio", displayName: "Arpeggio" },
  mute: { id: "mute", displayName: "Mute" },
  riff: { id: "riff", displayName: "Riff" },
  lead: { id: "lead", displayName: "Lead" },
  chord: { id: "chord", displayName: "Chord" },
  walk: { id: "walk", displayName: "Walk" },
  slap: { id: "slap", displayName: "Slap" },
  pick: { id: "pick", displayName: "Pick" },
  rock: { id: "rock", displayName: "Rock" },
  jazz: { id: "jazz", displayName: "Jazz" },
  funk: { id: "funk", displayName: "Funk" },
  pad: { id: "pad", displayName: "Pad" },
  rhythm: { id: "rhythm", displayName: "Rhythm" },
  ballad: { id: "ballad", displayName: "Ballad" },
  classical: { id: "classical", displayName: "Classical" },
  pop: { id: "pop", displayName: "Pop" },
  pluck: { id: "pluck", displayName: "Pluck" },
  bass: { id: "bass", displayName: "Bass" },
  legato: { id: "legato", displayName: "Legato" },
  staccato: { id: "staccato", displayName: "Staccato" },
  pizzicato: { id: "pizzicato", displayName: "Pizzicato" },
};
