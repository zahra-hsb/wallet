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
    const [dailyProfit, setDailyProfit] = useState(0)
    const [profitlvl1, setProfitLvl1] = useState(0)
    const [profitlvl2, setProfitLvl2] = useState(0)
    const [profitlvl3, setProfitLvl3] = useState(0)
    const [totalProfit, setTotalProfit] = useState(0)
    const [withdrawableAmount, setWithdrawableAmount] = useState(0)
    const [priceValue, setPriceValue] = useState(0)
    const router = useRouter()
    const [status, setStatus] = useState('');
    const [isChecked, setChecked] = useState(false);

    const [values, setValues] = useState({
        amount: '',
        address: ''
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
        console.log(e.target.value);
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })

    }
    function handleChangeCheckBox(e) {
        setChecked(e.target.checked)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        if (values.amount === '' || values.address === '' && !isChecked) {
            setStatus({ message: 'please enter a value!', messageColor: 'text-red-500' })
            setTimeout(() => {
                setStatus('')
            }, 3000)
        } else if (values.amount > withdrawableAmount) {
            setValues({
                amount: '',
                address: ''
            })
            setStatus({ message: 'please enter less than withdrawable value!', messageColor: 'text-red-500' })
            setTimeout(() => {
                setStatus('')
            }, 3000)
        } else {
            const today = new Date();
            const formattedDate = today.toDateString();
            // !! withdrawal
            // await axios.put('/api/putPrice', { address, amount: values.amount })
            if (isChecked) {
                await axios.post('/api/postTransaction', { status: 'pending', address: address, date: formattedDate, amount: values.amount, transactionType: 'withdraw' })
            } else {
                await axios.post('/api/postTransaction', { status: 'pending', address: values.address, date: formattedDate, amount: values.amount, transactionType: 'withdraw' })
            }

        }
    }

    const result1 = useReadContract({
        abi,
        address: address,
        functionName: 'balanceOf',
    })



    useEffect(() => {
        async function getProfits() {
            try {
                const profits = await axios.get(`/api/getProfits?address=${encodeURIComponent(address)}`)
                const profitLvl1 = await axios.get(`/api/getLvl1Profit?address=${encodeURIComponent(address)}`)
                const profitLvl2 = await axios.get(`/api/getLvl2Profit?address=${encodeURIComponent(address)}`)
                const profitLvl3 = await axios.get(`/api/getLvl3Profit?address=${encodeURIComponent(address)}`)
                console.log(profitLvl1.data.lvl2Profit);
                if (profits.data && profitLvl1.data && profitLvl2.data) {
                    console.log(profitLvl3.data.total);
                    let total = profits?.data.profitValue + profitLvl1?.data.lvl1Profit + profitLvl3?.data.lvl3Profit + profitLvl2?.data.lvl2Profit
                    setDailyProfit(profits?.data.profitValue)
                    setProfitLvl1(profitLvl1?.data.lvl1Profit)
                    setProfitLvl2(profitLvl2?.data.lvl2Profit)
                    setProfitLvl3(profitLvl3?.data.lvl3Profit)
                    setTotalProfit(total)
                } else {
                    console.log('error');
                }

            } catch (error) {
                console.log(error);
            }
        }
        async function getUser() {
            try {
                const response = await axios.get(`/api/getPrice?address=${encodeURIComponent(address)}`)
                const investmentValue = await response.data.investmentValue.investmentValue
                const price = await response.data.price.price

                console.log(price);
                if (price) {
                    setPriceValue(price);
                    setWithdrawableAmount(price - investmentValue)
                } else {
                    console.warn(`No price found: ${price}`);
                }
                return response
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
        getProfits()
    }, [address])
    return (
        <>
            <section className="py-20 bg-main">
                <Container>
                    <h3>Wallet Balance</h3>
                    {/* <p>3210.00 USDT</p> */}
                    <p>{priceValue != 0 ? priceValue : '0'} USDT</p>
                    {/* <p>{priceValue ? priceValue : 'Loading...'} {result.data?.symbol}</p> */}
                    <div className="flex gap-3">
                        <button onClick={() => router.push('/deposit')} className="py-1 px-6 border rounded-full shadow-green border-[#20FF44]">Deposit</button>
                        <Link href={'#withdraw'} className="py-1 px-6 border rounded-full shadow-red border-[#FF2020]">Withdraw</Link>
                    </div>
                </Container>
                {/* <Container>
                    <h3 className="text-lg font-bold">Profits</h3>

                    <table className="text-white w-full">
                        <tr className="">
                            <th className="text-gray-400 py-5">Daily Profit</th>
                            <th className="text-gray-400 py-5">Total Profit</th>
                        </tr>
                        <tr className="border-y border-y-gray-700">
                            <th className="text-white py-5">{dailyProfit ? dailyProfit : 0}</th>
                            <th className="text-white py-5">{totalProfit ? totalProfit : 0}</th>
                        </tr>
                    </table>

                    <table className="text-white w-full">
                        <tr className="">
                            <th className="text-gray-400 py-5">lvl.1 Profit</th>
                            <th className="text-gray-400 py-5">lvl.2 Profit</th>
                            <th className="text-gray-400 py-5">lvl.3 Profit</th>
                        </tr>
                        <tr className="border-y border-y-gray-700">
                            <th className="text-white py-5">{profitlvl1 != 0 ? profitlvl1 : 0}</th>
                            <th className="text-white py-5">{profitlvl2 != 0 ? profitlvl2 : 0}</th>
                            <th className="text-white py-5">{profitlvl3 != 0 ? profitlvl3 : 0}</th> 
                        </tr>
                    </table>
                </Container> */}
                <Container>
                    <p className="text-lg ">the withdrawable amount is: </p>
                    {withdrawableAmount} USDT
                </Container>
                <Container>
                    <form id="withdraw" onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col gap-3 items-start">
                        <p>Submit a withdrawal request</p>
                        {!isChecked && <div className="flex flex-col w-full gap-1">
                            <label>wallet address</label>
                            <input type="text" value={values.address} onChange={(e) => handleChange(e)} name="address" className="p-2 rounded text-gray-800 outline-none" placeholder="Enter receipt wallet address" />
                        </div>}
                        <div className="flex flex-col w-full gap-1">
                            <label>Amount</label>
                            <input type="number" value={values.amount} onChange={(e) => handleChange(e)} name='amount' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter Amount" />
                        </div>
                        {/* <div className="flex flex-col w-full gap-1">
                            <label>Password</label>
                            <input type="password" value={values.password} onChange={(e) => handleChange(e)} name='password' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter your password" />
                        </div> */}
                        <div className="flex gap-1 justify-start w-full">
                            <input type="checkbox" onChange={(e) =>
                                handleChangeCheckBox(e)} checked={isChecked} id="remember" className="rounded" />
                            <label htmlFor="remember" className="text-[#00FF5E]">Use your current wallet address?</label>
                        </div>
                        <div className="w-full text-center">
                            <button className="py-1 px-6 border rounded-full border-[#20FF44] text-center">Submit</button>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            {status && renderAlert(status)}
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

const renderAlert = ({ message, messageColor }) => (
    <div className={`px-4 py-3 mt-5 leading-normal ${messageColor} rounded-full backdrop-blur-sm border border-${messageColor} mb-5 text-center`}>
        <p>{message}</p>
    </div>
)

export default Withdraw