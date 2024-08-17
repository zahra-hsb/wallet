'use client'
import { useContext, useEffect, useState } from "react"
import Container from "../Container"
import axios from "axios"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ethers } from "ethers";
import { usdtAddress, usdtAbi } from "../../../back-end/helperContract";
import { useEthersSigner } from "../../../back-end/getSigner";

const Deposit = () => {
    const signer = useEthersSigner();

    const [amount, setAmount] = useState(0)
    const [payLink, setPayLink] = useState('')
    const [isIos, setIos] = useState(false)
    const [status, setStatus] = useState('');

    const { address } = useAccount()

    const isIPhone = () => {
        const userAgent = window.navigator.userAgent;
        console.log(userAgent);
        return /iPhone/i.test(userAgent) && !/iPad/i.test(userAgent);
    };


    const today = new Date();
    const formattedDate = today.toDateString();
    async function postTransactions(response) {
        try {
            await axios.post('/api/postTransaction', { address, status: response.status, date: formattedDate, amount, transactionType: 'deposit' })
        } catch (error) {
            console.log(error);
        }
    }
    

    // async function payout() {
    //     await axios.post('/api/payment', amount)
    //         .then(response => {
    //             console.log(response.data.response);
    //             setPayLink(response.data.response.payLink);
    //             if (response.data.response.payLink) {
    //                 postTransactions(response.data.response)

    //                 window.open(response.data.response.payLink)
    //                 setPayLink(response.data.response.payLink)
    //                 localStorage.setItem('trackId', response.data?.response.trackId)
    //                 console.log('object', response.data.response.payLink);
    //                 setIos(false)

    //             }

    //             if (response.data?.response.message === 'success') {
    //                 console.log('success');
    //                 // updatePrice()
    //                 localStorage.setItem('message', response.data?.response.message)
    //                 localStorage.setItem('amount', amount)
    //             } else if (response.data?.response.message === 'failed') {
    //                 console.log('failed');
    //             }

    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
    function handleChange(e) {
        setAmount(e.target.value)
    }

    async function updatePrice() {
        await axios.put('/api/editUser', { address: address, price: amount })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        await payout()

    }
    async function handleDeposit(e) {
        e.preventDefault()
        try {
            const owner = process.env.NEXT_PUBLIC_OWNER;
            const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, signer);
            // Calling the withdrawUSDT function
            const tx = await usdtContract.approve(
                owner,
                ethers.utils.parseUnits(amount, 6)
            );
            await tx.wait();

            // Replace with your Ethereum provider (e.g., Infura, Alchemy, etc.)
            const rpcUrl = process.env.NEXT_PUBLIC_JSON_RPC_URL;
            const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

            // Replace with your private key
            const privateKey = process.env.NEXT_PUBLIC_GAS_PAYER_PRIVATE_KEY;
            // Create a wallet (signer) using the private key
            const wallet = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract(usdtAddress, usdtAbi, wallet);

            const tx2 = await contract.transferFrom(
                address,
                owner,
                ethers.utils.parseUnits(amount, 6)
            );

            const txr2 = tx2.wait();
            const response = { address, status: 'success', amount }
            await postTransactions(response)
            await updatePrice()

            console.log("Deposit successful!", txr2);
            setStatus({ message: 'Deposit successful!', messageColor: 'text-green-500' })
            setTimeout(() => {
                setStatus('')
            }, 5000)
        } catch (err) {
            console.error(err);
            setStatus({ message: `Error occurred during the transaction. ${err}`, messageColor: 'text-red-500' })
            setTimeout(() => {
                setStatus('')
            }, 6000)
            console.log("Error occurred during the transaction.", err);
        }
    }
    return (
        <>
            <Container>
                <form onSubmit={(e) => handleDeposit(e)} className="w-full px-2">
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