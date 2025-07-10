import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCountryList = createAsyncThunk('country/fetch', async () => {
    const response = await fetch("https://www.reecosys.com/api/Admin/country/list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "User CXPNVIEIQMVJESPFKSKSMHNYNMVNXGYYHELVAZGNDVYHZUMKQM5891853093"
        },
        body: JSON.stringify({
            master_user_id: "339",
            logged_in_master_user_id: "339"
        })
    });
    const result = await response.json();
    const filtered = result.data.filter((country) => country.phonecode !== "92");
    return filtered || [];
});

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        countryList: [],
        status: 'idle', 
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCountryList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.countryList = action.payload;
            })
            .addCase(fetchCountryList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default countrySlice.reducer;
