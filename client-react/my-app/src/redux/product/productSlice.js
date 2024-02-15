import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: "ProductSlice",
    initialState: {
        searchKeyword: "",

    },
    reducers: {
        addSearchKeyword: (state, action) => {
            state.searchKeyword= action.payload
        }
    }
})

export const {addSearchKeyword} = ProductSlice.actions
export default ProductSlice.reducer