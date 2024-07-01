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
import axios from "axios"

const Login = () => {
    const router = useRouter()
    const { isConnected, isConnecting, address } = useAccount()
    const [isConn, setConnected] = useState(false)
    const [referralCode, setReferralCode] = useState('')
    const [isLoad, setLoad] = useState(false)
    // const [address, setAddress] = useState('')

    const data = { address, referralCode }
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
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 12; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async function saveUser() {
        const referral = createRefCode()
        setReferralCode('https://regalchain.vercel.app/' + referral) 
        console.log(referral);
        // await axios.post('/api/users', data)
    }
    function handleClick() {
        if (isConnected) {
            router.push('dashboard')
            saveUser()
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