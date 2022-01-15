import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
  },
  reducers: {
    setUser: (state, action) => {
      Cookies.set(
        'notes-user', 
        JSON.stringify(action.payload),
        { expires: 1/24 }
      )
      state.secrect = action.payload
    }
  }
})

export const selectCount = state => state.user.value;
export const selectUser = state => state.secrect

export const { setUser } = userSlice.actions

export default userSlice.reducer