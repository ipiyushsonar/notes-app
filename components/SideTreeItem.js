import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue } from "framer-motion"
import styles from '../styles/SideTree.module.css'
import { useRouter } from 'next/router'


// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

export const Item = ({ color, setPosition, moveItem, i, item }) => {
  const [isDragging, setDragging] = useState(false)
  const ref = useRef(null)
  const router = useRouter()

  const dragOriginY = useMotionValue(0)

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    })
  })

  return (
    <motion.li
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      className={styles.li}
      style={{ background: color, height: 20 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      // drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          dragOriginY.set(dragOriginY.get() + delta.y);
        }
        return !isDragging;
      }}
      onClick={() => {
        router.push(`/?id=${item.id}`)
      }}
    >
      {item.title ? item.title : item.id}
    </motion.li>
  );
};