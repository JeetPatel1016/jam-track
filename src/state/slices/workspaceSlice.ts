import type { ViewType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Workspace {
  view: ViewType;
  selectedSectionId: string | null;
}

const initialWorkspace: Workspace = {
  view: "sections",
  selectedSectionId: null,
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: initialWorkspace,
  reducers: {
    changeView: (state, action: PayloadAction<ViewType>) => {
      state.view = action.payload;
    },
    selectSection: (state, action: PayloadAction<string | null>) => {
      state.selectedSectionId = action.payload;
    },
  },
});

export const { changeView, selectSection } = workspaceSlice.actions;

export default workspaceSlice.reducer;
