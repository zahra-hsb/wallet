'use client'
import { useRouter } from "next/navigation"
import Container from "../Container"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import axios from "axios"

const Wallet = () => {
    const router = useRouter()
    const [priceValue, setPriceValue] = useState(0)
    const [dailyProfit, setDailyProfit] = useState(0)
    const { address } = useAccount() 
    const [profitlvl1, setProfitLvl1] = useState(0)
    const [profitlvl2, setProfitLvl2] = useState(0)
    const [profitlvl3, setProfitLvl3] = useState(0)
    const [totalProfit, setTotalProfit] = useState(0)
    const [allProfit, setAllProfit] = useState(0)
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
                const price = await response.data.price.price
                const investmentValue = await response.data.investmentValue.investmentValue
                const allProfits = price - investmentValue 
                setAllProfit(allProfits)
                console.log(allProfits); 
                if (price) {
                    setPriceValue(price);
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
                <Container>
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
                    <div className="flex gap-5">
                        <p className="text-gray-400">all profits since today: </p>
                        <p className="text-white">{allProfit != 0 ? allProfit : 0}</p>
                    </div>
                </Container>
                <Container>
                    <button onClick={() => router.push('/deposit')} className="py-1 px-6 border rounded-full shadow-main border-[#00F0FF]">Topup</button>

                </Container>
            </section>
        </>
    )
}

export default Wallet