import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import LoginModal from "./Modals/LoginModal"
import SignupModal from "./Modals/SignupModal"
import styles from "../styles/Nav.module.css"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux'
import { saveDocument, selectCurrentDocument } from "./MainEditor/editorSlice"

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const currentDoc = useSelector(selectCurrentDocument)

  useEffect(() => {
    console.log('currentDoc', currentDoc)
  },[currentDoc])

  const userState = Cookies.get('notes-user')
  const dispatch = useDispatch()

  return (
    <div>
      {userState ? ( 
        <motion.button 
          className={styles.buttonLogin}
          whileTap={{ scale: 0.9 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          onClick={() => {
            dispatch(saveDocument())
          } }
        >
          Save
        </motion.button>
      ) : (
        <motion.button 
          className={styles.buttonLogin}
          onClick={() => setIsLoginOpen(!isLoginOpen)}
          whileTap={{ scale: 0.9 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        >
          Login
        </motion.button>
      )}
      <button onClick={toggle} className={styles.button}>
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" }
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" }
            }}
          />
        </svg>
      </button>

      <LoginModal 
        isOpen={isLoginOpen} 
        setIsOpen={setIsLoginOpen} 
        setIsSignupOpen={setIsSignupOpen}
      />

      <SignupModal 
        isOpen={isSignupOpen}
        setIsOpen={setIsSignupOpen}
        setIsLoginOpen={setIsLoginOpen}
      />

    </div>
  )
};
