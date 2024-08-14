'use client'

import { useEffect, useState } from "react"
import Container from "../Container"
import Image from "next/image"
import Failed from '../../../public/icons/payment-failed.svg'
import Successful from '../../../public/icons/digital-payment-successful.svg'
import Link from "next/link"
import axios from "axios"
import { useAccount } from "wagmi"

const PayStatus = () => {
    const [isPaid, setPaid] = useState(false)
    const message = localStorage.getItem('message')
    const amount = localStorage.getItem('amount')
    // const trackId = localStorage.getItem('trackId')
    const { address } = useAccount()
    console.log(message);
    // console.log(trackId);

    // const url = 'https://api.oxapay.com/api/inquiry';
    // const data = JSON.stringify({
    //     key: PAYMENT_API_CODE,
    //     trackId: trackId
    // });
    // console.log(trackId);
    

    async function updatePrice() {
        const prevPrice = await getPrice()
        await axios.put('/api/editUser', { address: address, price: amount })

    }


    useEffect(() => {
        // async function getPayStatus() {
        //     try {
        //         const transactions = await axios.get('/api/getTransaction')
        //         const status = transactions.find(item => item.trackId === trackId).status
        //         if (status !== undefined) {
        //             if (status === 'Paid') {
        //                 await updatePrice()
        //                 setPaid(true)
        //             } else {
        //                 setPaid(false)
        //             }
        //         } else {
        //             console.error('status undefined');
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }

        // }

        // getPayStatus()


        // async function getPayStatus() {
        //     try {
        //         const response = await axios.post(url, data, {
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         });
        //         console.log('Response:', response.data);
        //         if (response.data.result === '100') {
        //             await updatePrice()
        //             setPaid(true);
        //         } else {
        //             setPaid(false);
        //         }
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }
        // getPayStatus()

        if (message === 'success') {
            setPaid(true)
        } else {
            setPaid(false)
        }
        setTimeout(() => {
            if (isPaid) {
                updatePrice()
            }
        }, 3000)

    }, [])



    async function clearLocalStrg() {
        // if (isPaid) {
        //     await updatePrice()
        // }
        localStorage.clear()
    }
    return (
        <>
            <Container>
                {isPaid ?
                    <>
                        <p>Payment Successful!</p>
                        <Image src={Successful} alt="payment successfully" />
                    </>
                    :
                    <>
                        <p>Payment failed!</p>
                        <Image src={Failed} alt="payment failed" />
                    </>
                }
                <Link href={'/dashboard'} onClick={clearLocalStrg} className="bg-transparent border border-[#20A1FF] shadow-main cursor-pointer w-full py-2 rounded-full text-center my-2">return to dashboard</Link>
            </Container>
        </>
    )
}

export default PayStatus