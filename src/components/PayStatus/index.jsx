'use client'

import { useEffect, useState } from "react"
import Container from "../Container"
import Image from "next/image"
import Failed from '../../../public/icons/payment-failed.svg'
import Successful from '../../../public/icons/digital-payment-successful.svg'
import Link from "next/link"

const PayStatus = () => {
    const [isPaid, setPaid] = useState(false)
    // const message = localStorage.getItem('message')
    // const trackId = localStorage.getItem('trackId')
    useEffect(() => {
        // if (message === 'success') {
        //     setPaid(true)
        // } else {
        //     setPaid(false)
        // }
    }, [message])

    // const axios = require('axios');
    // const url = 'https://api.oxapay.com/api/inquiry';
    // const data = JSON.stringify({
    //     key: 'S35UYY-T3E96V-A3VNKK-SUDT3H',
    //     trackId: trackId
    // });

    // axios.post(url, data)
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    function clearLocalStrg() {
        localStorage.clear()
    }
    return (
        <>
            <Container>
                {/* {isPaid ?
                    <>
                        <p>Payment Successful!</p>
                        <Image src={Successful} />
                    </>
                    :
                    <>
                        <p>Payment failed!</p>
                        <Image src={Failed} />
                    </>
                } */}
                <Link href={'/dashboard'} onClick={clearLocalStrg} className="bg-transparent border border-[#20A1FF] shadow-main cursor-pointer w-full py-2 rounded-full text-center my-2">return to dashboard</Link>
            </Container>
        </>
    )
}

export default PayStatus