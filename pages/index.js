import styles from '../styles/Home.module.css'
import SideMenu from '../components/SideMenu'
import { SideTree } from '../components/SideTree'
import MainEditor from '../components/MainEditor/MainEditor'

export default function Home() {
  return (
    <>
    <SideMenu />
    <div className={styles.mainWrapper}>
      <div className={styles.sideItems}>
        <SideTree />
      </div>
      <div className={styles.container}>
        <MainEditor />
      </div>
    </div>
    </>
  ) 
}
