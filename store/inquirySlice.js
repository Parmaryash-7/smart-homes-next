import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  thankyouData: {
    page_name: '',
    document: [],
  },
  projectDetailInq: null,
  inquiryPrefill: null, 
};

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    openInquiry: (state, action) => {
      state.isOpen = true;
      state.inquiryPrefill = action.payload || null;
    },
    closeInquiry: (state) => {
      state.isOpen = false;
      state.inquiryPrefill = null;
    },
    setThankYouData(state, action) {
      state.thankyouData = action.payload;
    },
    clearThankYouData(state) {
      state.thankyouData = initialState.thankyouData;
    },
    setProjectDetail(state, action) {
      state.projectDetailInq = action.payload; // ✅ Set project detail
    },
    removeProjectDetail(state) {
      state.projectDetailInq = null; // ✅ Clear project detail
    },
  },
});

export const {
  openInquiry,
  closeInquiry,
  setThankYouData,
  clearThankYouData,
  setProjectDetail,
  removeProjectDetail, // ✅ Export new actions
} = inquirySlice.actions;

export default inquirySlice.reducer;
