'use client'
import Image from "next/image"
import Container from "../Container"
import commision from '../../../public/icons/Data.png'
import deposit from '../../../public/icons/Row.png'
import withdraw from '../../../public/icons/Body.png'
import { useAccount, useBalance, useReadContract } from "wagmi"
import { useEffect, useState } from "react"
import { abi } from "@/app/abi"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Withdraw = () => {
    const [amount, setAmount] = useState('')
    const [note, setNote] = useState('')
    const [password, setPassword] = useState('')

    const [priceValue, setPriceValue] = useState(0)
    const router = useRouter()

    const [values, setValues] = useState({
        amount: '',
        note: '',
        password: ''
    })

    const dataArray = [
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: deposit, title: 'deposit', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FFF50A' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: commision, title: '(Number_ID)', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#00FF7F' },
    ]

    const { address } = useAccount()

    const result = useBalance({
        address: address,
    })



    // console.log(result.data.formatted);
    // console.log(result.data.decimals);
    // console.log(result.data.symbol);
    // console.log(result.data?.value);

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    const result1 = useReadContract({
        abi,
        address: address,
        functionName: 'balanceOf',
    })



    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get('/api/getUsers')
                setPriceValue(response.data?.find(item => item.address === address).price);
                return response
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [address])
    return (
        <>
            <section className="py-20 bg-main">
                <Container>
                    <h3>Wallet Balance</h3>
                    {/* <p>3210.00 USDT</p> */}
                    <p>{priceValue ? priceValue + ' USDT' : 'Loading...'}</p>
                    {/* <p>{priceValue ? priceValue : 'Loading...'} {result.data?.symbol}</p> */}
                    <div className="flex gap-3">
                        <button onClick={() => router.push('/deposit')} className="py-1 px-6 border rounded-full shadow-green border-[#20FF44]">Deposit</button>
                        <Link href={'#withdraw'} className="py-1 px-6 border rounded-full shadow-red border-[#FF2020]">Withdraw</Link>
                    </div>
                </Container>
                <Container>
                    <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col gap-3 items-start">
                        <p id="withdraw">Submit a withdrawal request</p>
                        <div className="flex flex-col w-full gap-1">
                            <label>Amount</label>
                            <input type="number" value={values.amount} onChange={(e) => handleChange(e)} name='amount' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter Amount" />
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label>Note</label>
                            <input type="text" value={values.note} onChange={(e) => handleChange(e)} name="note" className="p-2 rounded text-gray-800 outline-none" placeholder="Enter notes (Optimal)" />
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label>Password</label>
                            <input type="password" value={values.password} onChange={(e) => handleChange(e)} name='password' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter your password" />
                        </div>
                        <div className="flex gap-1 justify-start w-full">
                            <input type="checkbox" id="remember" className="rounded" />
                            <label htmlFor="remember" className="text-[#00FF5E]">Remember this choice as default</label>
                        </div>
                        <div className="w-full text-center">
                            <button className="py-1 px-6 border rounded-full border-[#20FF44] text-center">Submit</button>
                        </div>
                    </form>

                </Container>

                <div className='shadow-main backdrop-blur-sm text-white flex flex-col items-center gap-2 border border-[#00F0FF] rounded-2xl m-8 pt-3'>
                    <h3 className='font-bold text-lg'>Transactions</h3>
                    <div className='w-full flex flex-col  gap-5 items-center border border-[#00F0FF] rounded-2xl p-3'>
                        {dataArray?.map((item, index) => (
                            <>
                                <div key={index} className="w-full flex justify-around">
                                    <div className="flex gap-3 items-center">
                                        <Image width={20} height={20} src={item.icon} alt="" />
                                        <span>
                                            <p className={item.title === 'commision' ? `text-[#00FF7F]` : item.title === 'deposit' ? 'text-[#FFF50A]' : item.title === 'withdraw' ? 'text-[#FD625E]' : 'text-[#00FF7F]'}>{item.title}</p>
                                            <p>{item.date}</p>
                                        </span>
                                    </div>
                                    <span>
                                        <p className={`text-[${item.color}]`}>{item.title1}</p>
                                        <p>{item.action}</p>
                                    </span>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Withdraw