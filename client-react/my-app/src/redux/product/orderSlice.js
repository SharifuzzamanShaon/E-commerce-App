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
        removeOrder: (state, action) => {
            const filteredOrder = state.orders.filter((item) => item.orderId != action.payload)
            state.orders = [...filteredOrder]
        },
        handleCart: (state) => {
            state.isOpenCart = !state.isOpenCart
        }

    }

})

export const { addOrder,removeOrder, handleCart } = orderSlice.actions

export default orderSlice.reducer