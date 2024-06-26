import Account from '../Dashboard/Account'
import { RiMenu3Fill } from "react-icons/ri";
import styles from '../../app/Home.module.css';


const MobileNav = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <span className={styles.menuBtn}>
                    <RiMenu3Fill size={25} />
                </span>
                <Account />
            </nav>
        </>
    )
}

export default MobileNav