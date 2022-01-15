import Modal from 'react-modal'
import { motion } from "framer-motion"
import styles from '../../styles/Nav.module.css'
import { useState } from 'react'
import { UserRegistration } from '../../fql/User'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount } from './userSlice'

export default function SignupModal({isOpen, setIsOpen, setIsLoginOpen}) {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
  })

  const handleChange = (e) => { 
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const registered = 
      await UserRegistration(state.username, state.email, state.password)
      console.log('registered', registered)
      alert('Registered new user')
      setState({
        username: '',
        password: '',
        email: '',
      })
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className={`${styles.Modal}`}
      style={{ height: '800px' }}
      contentLabel="Example Modal"
      overlayClassName={styles.Overlay}
    >
      <button className={styles.closeCrossBtn} onClick={() => setIsOpen(false)}>X</button>
      <div className={styles.loginContainer}>
      
      <input 
        className={styles.inputLogin} 
        placeholder="Username"
        name="username"
        onChange={handleChange}
      />
      <input 
        className={`${styles.inputLogin} ${styles.loginPassword}`} 
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input 
        className={`${styles.inputLogin} ${styles.loginPassword}`} 
        placeholder="Pasword"
        name="password"
        onChange={handleChange}
        type="password"
      />

        <motion.button 
          className={styles.loginActionBtn}
          whileTap={{ scale: 0.9 }}
          onClick={submitForm}
        >
          Signup
        </motion.button>
        <div className={styles.signupWrap}>
          <p>{`Already have an account?`}</p>
          <motion.button 
            className={styles.loginActionBtn}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsLoginOpen(true);
              setIsOpen(false);
            }}
          >
            Login
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}