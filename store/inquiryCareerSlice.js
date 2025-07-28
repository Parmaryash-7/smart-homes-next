// store/inquiryCareerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    prefillData: null,
};

const inquiryCareerSlice = createSlice({
    name: 'inquiryCareer',
    initialState,
    reducers: {
        openCareerInquiry: (state, action) => {
            state.isOpen = true;
            state.prefillData = action.payload || null;
        },
        closeCareerInquiry: (state) => {
            state.isOpen = false;
            state.prefillData = null;
        },
    },
});

export const {
    openCareerInquiry,
    closeCareerInquiry,
} = inquiryCareerSlice.actions;

export default inquiryCareerSlice.reducer;
