import { configureStore } from "@reduxjs/toolkit";
import weightSlice from "./weightSlice"

const store = configureStore({
    reducer: {
weight:weightSlice
    }
})

export default store;