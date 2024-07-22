'use client'
import { useContext, useEffect, useState } from "react"
import Container from "../Container"
import axios from "axios"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Deposit = () => {

    const [amount, setAmount] = useState(0)
    const [payLink, setPayLink] = useState('')
    const [isIos, setIos] = useState(false)

    const router = useRouter()
    const { address } = useAccount()

    const isIPhone = () => {
        const userAgent = window.navigator.userAgent;
        console.log(userAgent);
        return /iPhone/i.test(userAgent) && !/iPad/i.test(userAgent); // Exclude iPads
    };

    // async function checkPaymentStatus() {
    //     try {
    //         const response = await axios.post('/api/payout', 'payment');
    //         return response.data.status;
    //     } catch (error) {
    //         console.error(error);
    //         return 'failed';
    //     }
    // }

    async function postTransactions(response) {
        try {
            await axios.post('/api/postTransaction', response)
        } catch(error) {
            console.log(error);
        }
    }
    async function getPrice() {
        const res = await axios.get('/api/getUsers')
        return res.data?.find(item => item.address === address).price;
    }

    async function updatePrice() {
        const prevPrice = await getPrice()
        await axios.put('/api/editUser', { address: address, price: amount, prevPrice: prevPrice }) 

    }
    async function payout() {
        await axios.post('/api/payment', amount)
            .then(response => {
                console.log(response.data.response);
                setPayLink(response.data.response.payLink);
                if (response.data.response.payLink) {
                    postTransactions(response.data.response) 
                    // if (isIPhone()) {
                    //     // let windowReference = window.open()
                    //     // windowReference.location = response.data?.payLink
                    //     console.log('it`s iphone device');
                    //     // localStorage.setItem('link', response.data?.payLink)
                    //     // const link = localStorage.getItem('link')
                    //     setPayLink(response.data?.payLink)
                    //     setIos(true)
                    // } else {
                        window.open(response.data.response.payLink)
                        setPayLink(response.data.response.payLink)
                        localStorage.setItem('trackId', response.data?.response.trackId)
                        console.log('object', response.data.response.payLink);
                        setIos(false)
                    // }
                }
                // setTimeout(async () => {
                //     const status = await checkPaymentStatus();
                //     if (status === 'success') {
                //         console.log('Payment successful');
                //         updatePrice()
                //         localStorage.setItem('message', status)
                //     } else {
                //         console.log('Payment failed');
                //         localStorage.setItem('message', status)
                //     }
                // }, 10000);


                if (response.data?.response.message === 'success') {
                    console.log('success');
                    // updatePrice()
                    localStorage.setItem('message', response.data?.response.message) 
                    localStorage.setItem('amount', amount) 
                } else if (response.data?.response.message === 'failed') {
                    console.log('failed');
                }

            })
            .catch(error => {
                console.error(error);
            });
    }
    function handleChange(e) {
        setAmount(e.target.value)
    }
    


    async function handleSubmit(e) {
        e.preventDefault()

        await payout()

    }

    return (
        <>
            <Container>
                <form onSubmit={(e) => handleSubmit(e)} className="w-full px-2">
                    <p className="p-5 text-lg">Deposit</p>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" value={amount} onChange={(e) => handleChange(e)} name='amount' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter Amount" />
                    </div>
                    {/* <div className="flex flex-col w-full gap-2 mt-5">
                        <label htmlFor="upline">Upline Code</label>
                        <input type="text" id="upline" name='upline' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter Referral Code" />
                    </div> */}
                    <div className="w-full text-center py-5">
                        {/* {isIos ? <Link href={payLink} className="py-1 px-6 border rounded-full border-[#20FF44] text-center shadow-green" /> : */}
                            <button type="submit" className="py-1 px-6 border rounded-full border-[#20FF44] text-center shadow-green">Submit</button>
                        {/* } */}
                    </div>
                </form>
            </Container>
        </>
    )
}

export default Deposit