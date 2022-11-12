import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarEnabled: true,
  isSidebarVisible: false,
}
const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarVisible = !state.isSidebarVisible && state.isSidebarEnabled;
    },
    hideSidebar(state) {
      state.isSidebarVisible = false;
    }
  }
});

export default layoutSlice;