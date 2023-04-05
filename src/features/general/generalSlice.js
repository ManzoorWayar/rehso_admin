import { createSlice } from '@reduxjs/toolkit'

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        chatDetails: null,
        messageDetails: null,
    },
    reducers: {
        setChatDetails: (state, action) => {
            state.chatDetails = action.payload
        },
        setMessageDetails: (state, action) => {
            state.messageDetails = action.payload
        }
    }
})

export const {
    setChatDetails,
    setMessageDetails
} = generalSlice.actions

export default generalSlice.reducer

export const selectCurrentToken = (state) => state.general.userInfo?.accessToken