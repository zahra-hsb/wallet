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

    const { address } = useAccount()

    const isIPhone = () => {
        const userAgent = window.navigator.userAgent;
        console.log(userAgent);
        return /iPhone/i.test(userAgent) && !/iPad/i.test(userAgent); // Exclude iPads
    };


    async function postTransactions(response) {
        const today = new Date();
        const formattedDate = today.toDateString();
        try {
            await axios.post('/api/postTransaction', { trackId: response.trackId, address, status: response.message, date: formattedDate, amount, transactionType: 'deposit' })
        } catch (error) {
            console.log(error);
        }
    }
    async function getPrice() {
        const res = await axios.get('/api/getUsers')
        return res.data?.find(item => item.address === address).price;
    }

    async function payout() {
        await axios.post('/api/payment', amount)
            .then(response => {
                console.log(response.data.response);
                setPayLink(response.data.response.payLink);
                if (response.data.response.payLink) {
                    postTransactions(response.data.response)

                    window.open(response.data.response.payLink)
                    setPayLink(response.data.response.payLink)
                    localStorage.setItem('trackId', response.data?.response.trackId)
                    console.log('object', response.data.response.payLink);
                    setIos(false)

                }

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

                    <div className="w-full text-center py-5">

                        <button type="submit" className="py-1 px-6 border rounded-full border-[#20FF44] text-center shadow-green">Submit</button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default Deposit