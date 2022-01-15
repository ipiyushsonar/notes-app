import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UpsertDocument, GetDocument, GetDocumentsByUser } from '../../fql/Document'
import Cookies from 'js-cookie'

export const saveDocument = createAsyncThunk(
  'document/saveDocument',
  async (_, { getState }) => {
    const state = getState();
    let id = state.document.currentDocument ? 
      state.document.currentDocument : 'NEW_DOCUMENT'
    const value = state.document[id]
    const title = state.document.titles[id]
    const userState = Cookies.get('notes-user')
    const userId = JSON.parse(userState).id
    const res = await UpsertDocument(id, value, userId, title)
    return { id: res.ref.id, value, userId, title }
  }
)

export const getDocument = createAsyncThunk(
  'document/getDocument',
  async (id, _) => {
    const res = await GetDocument(id)
    return { id: res.ref.id, value: res.data.value, title: res.data.title }
  }
)

export const getDocumentsByUser = createAsyncThunk(
  'document/getDocumentsByUser',
  async (_, { getState }) => { 
    const userState = Cookies.get('notes-user')
    if(!userState) { 
      return []
    }
    const userId = JSON.parse(userState).id
    const res = await GetDocumentsByUser(userId)
    if(!res.data) { 
      return null;
    }
    const notes = []
    for (const item of res.data) {
      notes.push({
        id: item.ref.id,
        ...item.data
    })
    }
    return notes
  }
)


export const editorSlice = createSlice({
  name: 'document',
  initialState: {
    loading: false,
    currentDocument: null,
    error: null,
    mydocs: [],
    titles: {}
  },
  reducers: {
    setDocument: (state, action) => { 
      state[state.currentDocument ? state.currentDocument : 'NEW_DOCUMENT']
        = action.payload.value
    },
    setDocumentTitle: (state, action) => { 
      state.titles[state.currentDocument ? state.currentDocument : 'NEW_DOCUMENT']
        = action.payload.title
    },
    resetDocument: (state, action) => { 
      state.currentDocument = 'NEW_DOCUMENT'
      state.mydocs = []
    }
  },
  extraReducers: { 
    [saveDocument.pending]: (state, action) => {
      state.loading = true
    },
    [saveDocument.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.currentDocument = payload
      // Update the list of documents
      const index = state.mydocs.findIndex(doc => doc.id === payload.id)
      if(index === -1) { 
        state.mydocs.push(payload)
      } else {
        state.mydocs[index] = payload
      }
    },
    [saveDocument.rejected]: (state, err) => {
      state.loading = false
      console.error(err)
      state.error = err
    },
    [getDocument.pending]: (state, action) => {
      state.loading = true
    },
    [getDocument.fulfilled]: (state, {payload}) => { 
      state.loading = false
      state.currentDocument = payload.id
      state[payload.id] = payload.value
      state.titles[payload.id] = payload.title
    },
    [getDocument.rejected]: (state, error) => { 
      state.loading = false
      state.error = error
      console.log('Error', error)
    },
    [getDocumentsByUser.pending]: (state) => {
      state.loading = true
    },
    [getDocumentsByUser.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.mydocs = payload
    },
    [getDocumentsByUser.rejected]: (state, error) => { 
      state.loading = false
      state.error = error
      console.log('Error', error)
    }
  }
})

export const selectCurrentDocument = state => state.document.currentDocument
export const selectDocumentVal = state => state.document[state.document.currentDocument]
export const selectMyDocuments = state => state.document.mydocs
export const selectCurrentDocumentTitle = state => state.document.titles[state.document.currentDocument]

export const { setDocument, resetDocument, setDocumentTitle } = editorSlice.actions

export default editorSlice.reducer