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
  id: string;
  name: TrackType;
  volume: number;
  pattern: string;
}
