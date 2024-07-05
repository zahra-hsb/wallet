'use client'

import Account from '../Dashboard/Account'
import { RiMenu3Fill } from "react-icons/ri";
import styles from '../../app/Home.module.css';
import { useState } from 'react';
import MobileMenu from '../MobileMenu';
// import MobileMenu from '../MobileMenu';


const MobileNav = () => {
    const [isOpen, setOpen] = useState(false)

    function handleClick() {
        setOpen(true)
    }
    function close() {
        setOpen(false)
    }
    console.log(MobileMenu);
    return (
        <>
            <nav className={styles.navbar}>
                <span onClick={handleClick} className={styles.menuBtn}>
                    <RiMenu3Fill size={25} />
                </span>
                <MobileMenu isOpen={isOpen} close={close} /> 
                <Account />
            </nav>
        </>
    )
}

export default MobileNav