import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    reset() {
      return ''
    }
  }
})

export const setMessage = (message) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(reset())
    }, 4000)
  }
}

export const { setNotification, reset } = notificationSlice.actions
export default notificationSlice.reducer