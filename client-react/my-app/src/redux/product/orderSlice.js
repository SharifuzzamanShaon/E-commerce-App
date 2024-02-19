import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orderSlice",
    initialState: {
        isOpenCart: false,
        orders: [],
        limit: 5
    },
    reducers: {
        addOrder: (state, action) => {
            if (state.orders.length >= 5) {
                return state.orders
            }
            state.orders = [...state.orders, action.payload]
        },
        handleCart: (state) => {
            state.isOpenCart = !state.isOpenCart
        }

    }

})

export const { addOrder, handleCart } = orderSlice.actions

export default orderSlice.reducer