'use client'
import Image from "next/image"
import Link from "next/link"
import { MdKeyboardArrowDown } from "react-icons/md"
import ConnectButtonComp from '../ConnectButtonComp'
import styles from '../../app/Home.module.css';
import bg from '../../../public/bg/opacity.png'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useAccountEffect } from "wagmi";
import ConnectWallet from "../ConnectWallet";

const Login = () => {
    const router = useRouter()
    const { isConnected, isConnecting } = useAccount()
    const [isConn, setConnected] = useState(false)
    const [referralCode, setReferralCode] = useState('')
    const [isLoad, setLoad] = useState(false)

    useAccountEffect({
        onConnect() {
            setConnected(true)
        }
    })

    useEffect(() => {
        function loadHandler() {
            setLoad(true)
        }
        loadHandler()
    }, [])

    function createRefCode() {
        
    }

    function handleClick() {
        if (isConnected) {
            router.push('dashboard')
        }
    }
    return (
        <>
            <section className={styles.container}>
                <Image src={bg} alt="bg" className={styles.showImage} />
                {/* <Image src={bg} alt="bg" className={!isLoad ? styles.showImage : styles.fadeImage} /> */}
                <div className={!isLoad ? styles.loginContainer : styles.fade}>
                    <h4 className={styles.title}>Login form</h4>
                    <p className={styles.texts}>Choose how you want to connect. <br />
                        There are several wallet providers.</p>
                    <div className={styles.buttonContainer}>
                        {/* <ConnectButtonComp setConnected={setConnected} isConn={isConn} /> */}
                        {!isConn && <ConnectWallet />}
                        <button
                            className={isConn ? 'bg-transparent border border-[#20A1FF] shadow-main cursor-pointer w-full py-2 rounded-full  my-2' : styles.button}
                            disabled={isConn ? false : true}
                            onClick={handleClick}>Submit</button>
                    </div>
                    <div className={styles.list}>
                        <h3>Choose Language</h3>
                        <MdKeyboardArrowDown size={20} />
                    </div>
                    <div>
                        <p>Do not have an account?
                            <Link href={'#'} className={styles.link}> Signup here</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login