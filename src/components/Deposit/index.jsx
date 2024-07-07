'use client'
import { useState } from "react"
import Container from "../Container"
import axios from "axios"
import { useAccount } from "wagmi"

const Deposit = () => {

    const [amount, setAmount] = useState(0)
    const { address } = useAccount()

    function handleChange(e) {
        setAmount(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        // console.log(amount);
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