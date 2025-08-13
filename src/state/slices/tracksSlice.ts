import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Track, TrackType } from "@/types";
import { TRACK_TYPE_PATTERNS } from "@/lib/patterns";
import { nanoid } from "nanoid";

// Template for new tracks
export const TRACK_TEMPLATE: Omit<Track, "id" | "name"> = {
  type: "Acoustic Guitar",
  volume: 80,
  pan: 0,
  mute: false,
  solo: false,
  pattern: "default",
};

const defaultState: Track[] = [];

export const projectSlice = createSlice({
  name: "tracks",
  initialState: defaultState,
  reducers: {
    // Actions related to tracks
    addTrack: (state, action: PayloadAction<TrackType>) => {
      const patterns = TRACK_TYPE_PATTERNS[action.payload] || [];
      const newTrack: Track = {
        id: `track-${nanoid()}`,
        name: action.payload,
        type: action.payload,
        volume: TRACK_TEMPLATE.volume,
        pan: TRACK_TEMPLATE.pan,
        mute: TRACK_TEMPLATE.mute,
        solo: TRACK_TEMPLATE.solo,
        pattern: patterns[0] || TRACK_TEMPLATE.pattern,
      };
      state.push(newTrack);
    },
    updateTrack: (state, action: PayloadAction<Track>) => {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    muteTrack: (state, action: PayloadAction<string>) => {
      const track = state.find((t) => t.id === action.payload);
      if (track) {
        track.mute = !track.mute;
        if (track.mute) track.solo = false;
      }
    },

    soloTrack: (state, action: PayloadAction<string>) => {
      const track = state.find((t) => t.id === action.payload);
      if (track) {
        track.solo = !track.solo;
        if (track.solo) track.mute = false;
      }
    },
    removeTrack: (state, action: PayloadAction<string>) => {
      state = state.filter((t) => t.id !== action.payload);
    },
    duplicateTrack: (state, action: PayloadAction<Track>) => {
      const newTrack = { ...action.payload, id: `track-${nanoid()}` };
      state.push(newTrack);
    },
  },
});

export const {
  addTrack,
  removeTrack,
  duplicateTrack,
  updateTrack,
  muteTrack,
  soloTrack,
} = projectSlice.actions;

export default projectSlice.reducer;
