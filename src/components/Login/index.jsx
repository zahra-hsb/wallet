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
    const [showRefField, setShowRefField] = useState(false)
    // const [addressState, setAddress] = useState('')
    const pathname = usePathname()

    // console.log(data);
    useAccountEffect({
        onConnect() {
            setConnected(true)
        }
    })
    async function getUser(address) {
        try {
            const isExistUser = await axios.get(`/api/getUser?address=${address}`)
            return isExistUser.data.isExist;
        } catch (error) {
            console.log(error);
        }
    }

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
        const referralCode = 'https://aismart.liara.run' + pathname
        console.log('pathname: ', pathname);
        if (pathname != '/') {
            const result = await axios.get(`/api/getReferral?referralCode=${encodeURIComponent(referralCode)}`)
            const upAddress = await result.data
            console.log('68=> ', result.data, upAddress);
            const data = [
                { address: address, level: '1' }
            ]
            router.push('/dashboard')
            try {
                await axios.put('/api/editFriends', { data, upAddress, referralCode })
            } catch (err) {
                console.log(err);
            }
        } else {
            setShowRefField(true)
        }
    }
    async function handleClickSubmit() {

        const result = await axios.get(`/api/getReferral?referralCode=${encodeURIComponent(referralCode)}`)
        console.log(result.data);
        console.log(referralCode);
        const upAddress = await result.data
        console.log('85=> ', upAddress);
        // create data array and check found ref
        const data = [
            { address: address, level: '1' }
        ]
        router.push('/dashboard')
        try {
            await axios.put('/api/editFriends', { data, upAddress, referralCode })
        } catch (err) {
            console.log(err);
        }
    }
    async function handleClick() {
        if (isConnected) {
            checkUser()
        }
    }
    function handleChange(e) {
        setReferralCode(e.target.value)
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
                        {/* {!isConn && !isConnecting && <ConnectWallet />} */}
                        {showRefField &&
                            <>
                                <input onChange={(e) => handleChange(e)} type="text" value={referralCode} className="w-full p-2 rounded text-gray-800 outline-none" placeholder="enter the referral code please!" />
                                <button
                                    onClick={handleClickSubmit}
                                    className={isConn ? 'bg-transparent border border-[#20A1FF] shadow-main cursor-pointer w-full py-2 rounded-full  my-2' : styles.button}
                                    disabled={isConn ? false : true}
                                >{'Submit'}</button>
                            </>
                        }
                        {!showRefField && <button
                            className={isConn ? 'bg-transparent border border-[#20A1FF] shadow-main cursor-pointer w-full py-2 rounded-full  my-2' : styles.button}
                            disabled={isConn ? false : true}
                            onClick={handleClick}>{isConnecting ? 'connecting...' : 'Submit'}</button>}
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