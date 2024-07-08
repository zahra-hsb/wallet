'use client'
import { useState } from "react"
import Container from "../Container"
import axios from "axios"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"

const Deposit = () => {

    const [amount, setAmount] = useState(0)
    const [payLink, setPayLink] = useState('')
    const router = useRouter()
    const { address } = useAccount()
    const url = 'https://api.oxapay.com/merchants/request';
    const data = JSON.stringify({
        merchant: 'N1CGY7-7963BT-MCCLX7-V3F74B',
        amount: amount,
        callbackUrl: 'https://regalchain.vercel.app/reposit',
        returnUrl: 'https://regalchain.vercel.app/reposit'
    })
    async function payout() {
        await axios.post(url, data)
            .then(response => {
                setPayLink(response.data?.payLink);
                if (response.data?.payLink) window.open(response.data?.payLink)
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
        console.log(address);
        await axios.put('/api/editUser', { address: address, price: amount })
    }
    return (
        <>
            <Container>
                <form onSubmit={(e) => handleSubmit(e)} className="w-full px-2">
                    <p className="p-5">Deposit</p>
                    <div className="flex flex-col w-full gap-1">
                        <label>Amount</label>
                        <input type="number" value={amount} onChange={(e) => handleChange(e)} name='amount' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter Amount" />
                    </div>
                    <div className="w-full text-center py-5">
                        <button className="py-1 px-6 border rounded-full border-[#20FF44] text-center shadow-green">Submit</button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default Deposit