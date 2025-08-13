import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "@/state/slices/projectSlice";
import workspaceReducer from "@/state/slices/workspaceSlice";
import tracksReducer from "@/state/slices/tracksSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    project: projectReducer,
    workspace: workspaceReducer,
    tracks: tracksReducer,
  },
});
export const selectProjectData = (state: RootState) => {
  return {
    ...state.project,
    tracks: state.tracks, // Include full track data in export
  };
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
