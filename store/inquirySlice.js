import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  thankyouData: {
    page_name: '',
    document: []
  }
}

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    openInquiry: (state) => {
      state.isOpen = true
    },
    closeInquiry: (state) => {
      state.isOpen = false
    },
    setThankYouData(state, action) {
      state.thankyouData = action.payload
    },
    clearThankYouData(state) {
      state.thankyouData = initialState.thankyouData
    }
  }
})

export const { openInquiry, closeInquiry, setThankYouData, clearThankYouData } =
  inquirySlice.actions
export default inquirySlice.reducer
