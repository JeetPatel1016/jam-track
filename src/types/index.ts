// Types for your project
export interface Section {
  id: string;
  name: string;
  bars: number;
  chords?: string[];
}

export interface Track {
  id: string;
  name: TrackType;
  volume: number;
  pattern: string;
}

export interface Project {
  title: string;
  sections: Section[];
  tracks: Track[];
  settings: {
    tempo: number;
    volume: number;
  };
}

export type TrackType =
  | "Acoustic Guitar"
  | "Electric Guitar"
  | "Bass"
  | "Drums"
  | "Keys"
  | "Piano"
  | "Synth"
  | "Strings";
