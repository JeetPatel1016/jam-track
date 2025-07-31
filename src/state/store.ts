import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "@/state/slices/projectSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
