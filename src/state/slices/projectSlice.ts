import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Chord, Project, Section, Track, TrackType } from "@/types";
import { TRACK_TYPE_PATTERNS } from "@/lib/patterns";
import { nanoid } from "nanoid";

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
    // Actions related to project data
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setTempo: (state, action: PayloadAction<number>) => {
      state.settings = { ...state.settings, tempo: action.payload };
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.settings = { ...state.settings, volume: action.payload };
    },
    // Actions related to sections
    addSection: (state) => {
      const newSection: Section = {
        id: `section-${nanoid()}`,
        name: "New Section",
        chords: [],
      };
      state.sections.push(newSection);
    },
    duplicateSection: (state, action: PayloadAction<string>) => {
      const oldSection = state.sections.find((s) => s.id === action.payload);
      if (oldSection) {
        const newSection: Section = {
          ...oldSection,
          id: `section-${nanoid()}`,
          chords: oldSection.chords!.map((c) => ({
            ...c,
            id: `chord-${nanoid()}`,
          })),
        };
        state.sections.push(newSection);
      }
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
    // Actions related to tracks
    addTrack: (state, action: PayloadAction<TrackType>) => {
      const patterns = TRACK_TYPE_PATTERNS[action.payload] || [];
      const newTrack: Track = {
        id: `track-${nanoid()}`,
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
      const newTrack = { ...action.payload, id: `track-${nanoid()}` };
      state.tracks.push(newTrack);
    },
    // Actions related to chords
    addChord: (state, action: PayloadAction<string>) => {
      const sectionIndex = state.sections.findIndex(
        (s) => s.id === action.payload
      );
      if (sectionIndex !== -1) {
        const newChord: Chord = {
          id: `chord-${nanoid()}`,
          key: "C",
          type: "maj",
          duration: "4/4",
          bass: "C",
          inversion: "Root",
        };
        state.sections[sectionIndex] = {
          ...state.sections[sectionIndex],
          chords: [...(state.sections[sectionIndex].chords || []), newChord],
        };
      }
    },
    removeChord: (
      state,
      action: PayloadAction<{ chordId: string; sectionId: string }>
    ) => {
      const sectionIndex = state.sections.findIndex(
        (s) => s.id === action.payload.sectionId
      );
      if (sectionIndex !== -1) {
        state.sections[sectionIndex] = {
          ...state.sections[sectionIndex],
          chords: state.sections[sectionIndex].chords?.filter(
            (c) => c.id !== action.payload.chordId
          ),
        };
      }
    },
    updateChord: (
      state,
      action: PayloadAction<{ chord: Chord; sectionId: string }>
    ) => {
      const { chord, sectionId } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section && section.chords) {
        const chordIndex = section.chords.findIndex((c) => c.id === chord.id);
        if (chordIndex !== -1) {
          const prevChord = section.chords[chordIndex];
          // If key changed, set bass to new key. Otherwise, keep bass as is.
          if (chord.key !== prevChord.key) {
            section.chords[chordIndex] = { ...chord, bass: chord.key };
          } else {
            section.chords[chordIndex] = chord;
          }
        }
      }
    },
    reorderChords: (
      state,
      action: PayloadAction<{
        sectionId: string;
        oldIndex: number;
        newIndex: number;
      }>
    ) => {
      const { sectionId, oldIndex, newIndex } = action.payload;
      const section = state.sections.find((s) => (s.id = sectionId));
      if (section && section.chords) {
        if (
          oldIndex < 0 ||
          oldIndex >= section.chords.length ||
          newIndex < 0 ||
          newIndex >= section.chords.length
        ) {
          return;
        }
        const movedChord = section.chords[oldIndex];
        section.chords.splice(oldIndex, 1);
        section.chords.splice(newIndex, 0, movedChord);
      }
    },
  },
});

export const {
  setTitle,
  setTempo,
  setVolume,
  addSection,
  duplicateSection,
  removeSection,
  updateSection,
  reorderSections,
  addTrack,
  removeTrack,
  duplicateTrack,
  updateTrack,
  addChord,
  removeChord,
  updateChord,
  reorderChords,
} = projectSlice.actions;

export default projectSlice.reducer;
