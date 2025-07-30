import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  booking_data : {} 
};

const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    
    setBookingData(state, action) {
      state.booking_data = action.payload;
    },
    clearBookingData(state) {
      state.booking_data = initialState.booking_data;
    },
  },
});

export const {
  setBookingData,
  clearBookingData,
 
} = BookingSlice.actions;

export default BookingSlice.reducer;
