import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  thankyouData: {
    page_name: '',
    documents: [],
    drive_url: '',
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
      state.projectDetailInq = action.payload; 
    },
    removeProjectDetail(state) {
      state.projectDetailInq = null; 
    },
  },
});

export const {
  openInquiry,
  closeInquiry,
  setThankYouData,
  clearThankYouData,
  setProjectDetail,
  removeProjectDetail, 
} = inquirySlice.actions;

export default inquirySlice.reducer;
