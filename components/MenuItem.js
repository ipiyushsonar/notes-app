import * as React from "react";
import { motion } from "framer-motion";
import styles from "../styles/Nav.module.css";
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from "next/router"
import { useDispatch } from "react-redux";
import { resetDocument } from "./MainEditor/editorSlice";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` }
  const router = useRouter()
  const dispatch = useDispatch()
  let itemDetails = {}
  switch (i) { 
    case 0:
      itemDetails = { 
        title: "New",
        icon: <Image src="/draft.png" alt="me" width="64" height="64" />
      }
      break;
    case 1:
      itemDetails = { 
        title: "Share",
        icon: <Image src="/share.png" alt="me" width="64" height="64" />
      }
      break;
    case 2:
      itemDetails = { 
        title: "Logout",
        icon: <Image src="/logout.png" alt="me" width="64" height="64" />,
      }
      break;

  }

  const logoutUser = () => {
    console.log('logoutUser')
    Cookies.remove('notes-user')
    dispatch(resetDocument())
    alert('Logged out')
    router.push('/')
  }

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={
        () => {
          if(i === 2) {
            logoutUser()
          }
        }
      }
    >
      <div className={styles.iconPlaceholder} >
        {itemDetails.icon}
      </div>
      <div className={styles.textPlaceholder} >
        {itemDetails.title}
      </div>
    </motion.li>
  );
};
