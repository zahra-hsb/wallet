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
        return /iPhone/i.test(userAgent) && !/iPad/i.test(userAgent); // Exclude iPads
    };
    async function updatePrice() {
        const prevPrice = await getPrice()
        await axios.put('/api/editUser', { address: address, price: amount, prevPrice: prevPrice })

    }

    async function payout() {
        await axios.post('/api/payment', amount)
            // .then(response => {
            //     console.log(response.data);
                // setPayLink(response.data?.payLink);
                // if (response.data?.payLink) {
                //     if (isIPhone()) {
                //         // let windowReference = window.open()
                //         // windowReference.location = response.data?.payLink
                //         // localStorage.setItem('link', response.data?.payLink)
                //         // const link = localStorage.getItem('link')
                //         setIos(true)
                //     } else {
                //         window.open(response.data?.payLink)
                //         setIos(false)
                //     }
                // }
                // if (response.data?.message === 'success') {
                //     console.log('success');
                //     updatePrice()
                //     localStorage.setItem('message', response.data?.message)
                // } else if (response.data?.message === 'failed') {
                //     console.log('failed');
                // }
            // })
            // .catch(error => {
            //     console.error(error);
            // });
    }
    function handleChange(e) {
        setAmount(e.target.value)
    }
    async function getPrice() {
        const res = await axios.get('/api/getUsers')
        return res.data?.find(item => item.address === address).price;
    }


    async function handleSubmit(e) {
        e.preventDefault()
        if (isIPhone) {

        }
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
                        {isIos ? <Link href={payLink} /> :
                            <button type="submit" className="py-1 px-6 border rounded-full border-[#20FF44] text-center shadow-green">Submit</button>
                        }
                    </div>
                </form>
            </Container>
        </>
    )
}

export default Deposit