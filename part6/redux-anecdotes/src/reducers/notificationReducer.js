import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
    name: 'message',
    initialState: '',
    reducers: {
        changeMessage(state, action) {
            return action.payload
        },
        removeMessage(state, action) {
            return ''
        }
    }
})

export const {changeMessage, removeMessage} = notificationReducer.actions

export const setMessage = (message, time) => {
    return async dispatch => {
        clearTimeout(window.timer)
        window.timer = setTimeout(() => { dispatch(changeMessage(''))}, time*1000)
        dispatch(changeMessage(message))
    }
}

export default notificationReducer.reducer
