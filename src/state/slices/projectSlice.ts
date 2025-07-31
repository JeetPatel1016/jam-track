import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Project, Section, Track, TrackType } from "@/types";
import { TRACK_TYPE_PATTERNS } from "@/lib/patterns";

const defaultProject: Project = {
  title: "Untitled Jam Track",
  sections: [],
  tracks: [],
  settings: { tempo: 120, volume: 80 },
};

export const projectSlice = createSlice({
  name: "project",
  initialState: defaultProject,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addSection: (state) => {
      const newSection = {
        id: `section-${Date.now()}`,
        name: "New Section",
        bars: 0,
        chords: [],
      };
      state.sections.push(newSection);
    },
    updateSection: (state, action: PayloadAction<Section>) => {
      const index = state.sections.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.sections[index] = action.payload;
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter((s) => s.id !== action.payload);
    },
    addTrack: (state, action: PayloadAction<TrackType>) => {
      const patterns = TRACK_TYPE_PATTERNS[action.payload] || [];
      const newTrack: Track = {
        id: `track-${Date.now()}`,
        name: action.payload,
        volume: 80,
        pattern: patterns[0] || "default",
      };
      state.tracks.push(newTrack);
    },
    updateTrack: (state, action: PayloadAction<Track>) => {
      const index = state.tracks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tracks[index] = action.payload;
      }
    },
    removeTrack: (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter((t) => t.id !== action.payload);
    },
    duplicateTrack: (state, action: PayloadAction<Track>) => {
      const newTrack = { ...action.payload, id: `track-${Date.now()}` };
      state.tracks.push(newTrack);
    },
    setTempo: (state, action: PayloadAction<number>) => {
      state.settings = { ...state.settings, tempo: action.payload };
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.settings = { ...state.settings, volume: action.payload };
    },
    reorderSections: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      if (
        oldIndex < 0 ||
        oldIndex >= state.sections.length ||
        newIndex < 0 ||
        newIndex >= state.sections.length
      ) {
        return;
      }
      const movedSection = state.sections[oldIndex];
      state.sections.splice(oldIndex, 1);
      state.sections.splice(newIndex, 0, movedSection);
    },
  },
});

export const {
  setTitle,
  addSection,
  removeSection,
  updateSection,
  addTrack,
  removeTrack,
  duplicateTrack,
  updateTrack,
  reorderSections,
  setTempo,
  setVolume,
} = projectSlice.actions;

export default projectSlice.reducer;
