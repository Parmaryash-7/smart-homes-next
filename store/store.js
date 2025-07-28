import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice';
import inquiryReducer from './inquirySlice';
import inquiryCareerSlice  from './inquiryCareerSlice';

export const store = configureStore({
    reducer: {
        country: countryReducer,
        inquiry: inquiryReducer,
        inquiryCareer: inquiryCareerSlice,
    },
});
