import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "@/state/slices/projectSlice";
import workspaceReducer from "./slices/workspaceSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    project: projectReducer,
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
