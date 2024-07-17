'use client'

import { useState } from "react"

const PayStatus = () => {
    const [isPaid, setPaid] = useState(false)
    const message = localStorage.getItem('message')
    if (message === 'success') {
        setPaid(true)
    } else {
        setPaid(false)
    }

    function clearLocalStrg() {
        localStorage.clear()
    }
    return (
        <>
            
        </>
    )
}

export default PayStatus