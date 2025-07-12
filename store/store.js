import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice';
import inquiryReducer from './inquirySlice';

export const store = configureStore({
    reducer: {
        country: countryReducer,
        inquiry: inquiryReducer
    },
});
