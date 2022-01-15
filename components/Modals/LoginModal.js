import Modal from 'react-modal'
import { motion } from "framer-motion"
import styles from '../../styles/Nav.module.css'
import { UserLogin } from '../../fql/User'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './userSlice'
import { getDocumentsByUser } from '../MainEditor/editorSlice'


export default function LoginModal({isOpen, setIsOpen, setIsSignupOpen}) {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })

  }

  const loginUser = async (e) => { 
    e.preventDefault()
    try {
      const user = await UserLogin(state.email, state.password)
      console.log('user', user)
      dispatch(setUser({ secrect: user.secret, email: state.email, id: user.user.id }))
      alert('Logged in')
      setState({
        email: '',
        password: '',
      })
      setIsOpen(false)
      dispatch(getDocumentsByUser())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={styles.Modal}
      contentLabel="Example Modal"
      overlayClassName={styles.Overlay}
    >
      <button className={styles.closeCrossBtn} onClick={() => setIsOpen(false)}>X</button>
      <div className={styles.loginContainer}>
        <input 
          className={styles.inputLogin} 
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
        <input 
          className={`${styles.inputLogin} ${styles.loginPassword}`} 
          placeholder="Pasword"
          name='password'
          onChange={handleChange}
          type='password'
        />
        <motion.button 
          className={styles.loginActionBtn}
          whileTap={{ scale: 0.9 }}
          onClick={loginUser}
        >
          Login
        </motion.button>
        <div className={styles.signupWrap}>
          <p>{`Don't have an account?`}</p>
          <motion.button 
            className={styles.loginActionBtn}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsSignupOpen(true);
              setIsOpen(false);
            }}
          >
            Signup
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}