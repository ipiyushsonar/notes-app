import { configureStore } from '@reduxjs/toolkit'
import editorSlice from './components/MainEditor/editorSlice'
import userSlice from './components/Modals/userSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    document: editorSlice
  }
})