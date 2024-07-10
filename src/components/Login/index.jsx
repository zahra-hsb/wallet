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
    const { isConnected, isConnecting, address } = useAccount()
    const [isConn, setConnected] = useState(false)
    const [referralCode, setReferralCode] = useState('')
    const [isLoad, setLoad] = useState(false)
    const [users, setUsers] = useState([])
    // const [addressState, setAddress] = useState('')
    const [dataObj, setDataObj] = useState({})
    const pathname = usePathname()
    let isExistUser;
    const data = { address, referralCode }
    // console.log(data);
    useAccountEffect({
        onConnect() {
            setConnected(true)
        }
    })





    async function addUser(referral) {
        try {
            if (isConnected)
                await axios.post('/api/postUser', { address: address, referralCode: referral, price: 0 })
        } catch (error) {
            console.log(error);
        }
    }

    async function getUsers(referral, pathname) {
        try {
            const res = await axios.get('/api/getUsers')
            setUsers(res.data)

            if (res.status !== 200) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch users: ${errorData.message}`);
            }


            return res.data;
            // find friends
            if (pathname === `/${referral}`) {
                const link = 'https://aismart.liara.run' + pathname
                console.log(link);
                const foundFriend = res.data.find(item => item.referralCode === link)
                console.log(foundFriend.friends);
                if (isConnected) {

                    // update friends property
                    try {
                        await axios.put('/api/editFriends', { link: link, address: address, amountOfInvest: 0, level: '1' })
                    } catch (err) {
                        console.log(err);
                    }
                }
            }



        } catch (err) {
            console.error("Error fetching users:", err);
            return null;
        }
    }

    // function addToState(address, referralCode) {
    //     setDataObj({ address: address, referralCode: referralCode })
    // }

    async function checkUser() {
        const referral = createRefCode()

        const resultRef = 'https://aismart.liara.run/' + referral


        // get users
        const users = await getUsers(resultRef)
        if (users) {
            console.log(users);
        }
        if (!users) {
            console.log('the users does not exist in database!!!');
        } else {
            const foundUser = users?.find(item => item.address === address)
            return [foundUser, resultRef]
        }

        setReferralCode(resultRef)
        // referral 
        // if (pathname === `/${resultRef}`) {
        //     return router.query.slug
        // }

        // const data = [
        //     { link: resultRef, address: address, amountOfInvest: 0, level: '1' }
        // ]
        // try {
        //     const link = 'https://aismart.liara.run' + pathname
        //     await axios.put('/api/editFriends', { data, link })
        // } catch (err) {
        //     console.log(err);
        // }

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
        // console.log(address);
        // addToState(address, referralCode)
        // getUsers(null, pathname)

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