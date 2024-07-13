'use client'
import Image from "next/image"
import Link from "next/link"
import { MdKeyboardArrowDown } from "react-icons/md"
import ConnectButtonComp from '../ConnectButtonComp'
import styles from '../../app/Home.module.css';
import bg from '../../../public/bg/opacity.png'
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAccount, useAccountEffect } from "wagmi";
import ConnectWallet from "../ConnectWallet";
import axios from "axios"
import { createRefCode } from "@/lib/methods"

const Login = () => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const { isConnected, isConnecting, address } = useAccount()
    const [isConn, setConnected] = useState(false)
    const [referralCode, setReferralCode] = useState('')
    const [isLoad, setLoad] = useState(false)
    const [users, setUsers] = useState([])
    // const [addressState, setAddress] = useState('')
    const pathname = usePathname()

    // console.log(data);
    useAccountEffect({
        onConnect() {
            setConnected(true)
        }
    })


    async function getUsers() {
        try {
            const res = await axios.get('/api/getUsers')
            setUsers(res.data)

            if (res.status !== 200) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch users: ${errorData.message}`);
            }


            return res.data;



        } catch (err) {
            console.error("Error fetching users:", err);
            return null;
        }
    }


    async function checkUser() {


        // get users
        const users = await getUsers()
        if (users) {
            console.log(users);
        } else {
            setError(true)
        }

        const foundRef = users?.some(item => item.referralCode === pathname)

        const data = [
            { link: '', address: address, amountOfInvest: 0, level: '1' }
        ]

        setReferralCode(foundRef)
        console.log('found referral: ', foundRef);
        // referral 
        if (pathname === `/${foundRef}`) {
            console.log(pathname);
            return router.query.slug
        }


        try {
            const link = 'https://aismart.liara.run' + pathname
            await axios.put('/api/editFriends', { data, link })
        } catch (err) {
            console.log(err);
        }

        if (!users) {
            console.log('the users does not exist in database!!!');
        } else {
            return [users]
        }

    }
    async function handleClick() {
        if (isConnected) {
            const data = await checkUser()
            router.push('/dashboard')
        }
    }

    useEffect(() => {
        function loadHandler() {
            setLoad(true)
        }
        loadHandler()

    }, [isConn, isConnected])


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
                            onClick={handleClick}>{isConnecting ? 'connecting...' : 'Submit'}</button>
                    </div>
                    <div>
                        {error ? 'there is some error in database' : ''}
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