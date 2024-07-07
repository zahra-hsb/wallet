'use client'
import { useState } from "react"
import Container from "../Container"

const Deposit = () => {

    const [amount, setAmount] = useState(0)

    function handleChange(e) {
        setAmount(e.target.value)
    }
    function handleSubmit() {
        
    }
    return (
        <>
            <Container>
                <form className="w-full px-2">
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