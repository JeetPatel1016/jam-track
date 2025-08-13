export type TrackType =
  | "Acoustic Guitar"
  | "Electric Guitar"
  | "Bass"
  | "Drums"
  | "Keys"
  | "Piano"
  | "Synth"
  | "Strings";

export interface Track {
  // Identification and metadata
  id: string;
  name: TrackType;
  // Instrument settings
  type: TrackType;
  // Mix settings
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  // Playback settings
  pattern: string;
}
