import { useState, useEffect } from 'react'
import { Editor, Viewer } from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import gemoji from '@bytemd/plugin-gemoji'
import { useDispatch, useSelector } from 'react-redux'
import { 
  getDocument, 
  setDocument, 
  selectDocumentVal, 
  setDocumentTitle, 
  selectCurrentDocumentTitle
} from './editorSlice'
import { useRouter } from 'next/router'
import styles from '../../styles/Editor.module.css'


const plugins = [
  gfm(),
  gemoji(),
  mermaid(),
  mediumZoom(),
  math(),
  highlight(),
  frontmatter(),
  footnotes(),
  breaks(),
]

export default function  MainEditor() {
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const currentDoc = useSelector(selectDocumentVal)
  const currentDocTitle = useSelector(selectCurrentDocumentTitle)

  useEffect(() => {
    if(router.query.id) {
      dispatch(getDocument(router.query.id))
    }
  }, [router])

  useEffect(() => {
    if(currentDoc) {
      setValue(currentDoc)
    }
  }, [currentDoc])

  useEffect(() => {
    setTitle(currentDocTitle)
   }, [currentDocTitle])


  return (
    <>
      <input 
        value={title} 
        onChange={
          (e) => {
            setTitle(e.target.value)
            dispatch(setDocumentTitle({title: e.target.value}))
          }
        } 
        placeholder='Filename'
        className={styles.titleInput}
      />
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v)
          dispatch(setDocument({
            title,
            value: v
          }))
        }}
      />
    </>
  )
}