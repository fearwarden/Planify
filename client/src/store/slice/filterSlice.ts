import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  isActive: boolean;
  filter: string;
  type: string;
}

const initialState: FilterState = {
  isActive: false,
  filter: "",
  type: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filter: (state, action: PayloadAction<FilterState>) => {
      (state.isActive = action.payload.isActive),
        (state.filter = action.payload.filter),
        (state.type = action.payload.type);
    },
  },
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
