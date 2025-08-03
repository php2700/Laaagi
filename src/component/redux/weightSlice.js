import { createSlice } from "@reduxjs/toolkit";

const weightSlice = createSlice({
    name: 'weight',
    initialState: { value: 1000 },
    reducers: {
        chnageWeight: (state, action) => {
            state.value = action?.payload;
        }
    }
})

export const { chnageWeight } = weightSlice.actions;
export default weightSlice.reducer;