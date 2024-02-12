import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    currentUser: null,
    error: null,
    loading: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.loading = null,
                state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = null,
                state.error = action.payload
        },
        userUpdateStart: (state) => {
            state.loading = true
        },
        userUpdateSuccess: (state, action) => {
            state.loading = false,
                state.currentUser = action.payload,
                state.error = null
        },
        userUpdateFaided: (state, action) => {
            state.loading = null,
                state.error = action.payload
        },
        userDeleteStarted: (state) => {
            state.loading = true
        },
        userDeleteSuccess: (state) => {
            state.loading = false,
                state.currentUser = null,
                state.error = null
        },
        userDeleteFailde: (state, action) => {
            state.loading = null,
                state.error = action.payload

        },
        userSignOut: (state) => {
            state.currentUser = null

        }
    },
})

export const { signInStart, signInSuccess, signInFailure, userUpdateStart, userUpdateSuccess,
    userUpdateFaided, userDeleteStarted, userDeleteFailde, userDeleteSuccess, userSignOut } = userSlice.actions

export default userSlice.reducer