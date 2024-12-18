'use client'
import { useRouter } from "next/navigation"
import Container from "../Container"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import axios from "axios"
import Web3 from "web3"
import { ethers } from "ethers";
import { usdtAddress, usdtAbi } from "../../../back-end/helperContract";
import { useEthersSigner } from "../../../back-end/getSigner";

const Wallet = () => {
    const router = useRouter()
    const { address } = useAccount()
    const [priceValue, setPriceValue] = useState(0)
    const [dailyProfit, setDailyProfit] = useState(0)
    const [profitlvl1, setProfitLvl1] = useState(0)
    const [profitlvl2, setProfitLvl2] = useState(0)
    const [profitlvl3, setProfitLvl3] = useState(0)
    const [totalProfit, setTotalProfit] = useState(0)
    const [allProfit, setAllProfit] = useState(0)
    const [limit, setLimit] = useState(false)
    const [amount, setAmount] = useState('')
    const [getableProfit, setGetableProfit] = useState(0)
    const [topupValue, setTopupValue] = useState(0)
    const [status, setStatus] = useState('');
    const [isShowTopup, setShowTopup] = useState(false)
    const signer = useEthersSigner()
    function handleChange(e) {
        setAmount(e.target.value)
    }
    const today = new Date();
    const formattedDate = today.toDateString();
    async function postTransactions(response) {
        try {
            await axios.post('/api/postTransaction', { address, status: response.status, date: formattedDate, amount, transactionType: 'topUp' })
        } catch (error) {
            console.log(error);
        }
    }
    async function updatePrice() {
        await axios.put('/api/editPrice', { address: address, price: amount })
    }

    async function doTopup(e) {
        e.preventDefault()
        if (amount === '') {
            setStatus({ message: 'please input the topup value', messageColor: 'text-red-500' })
            setTimeout(() => {
                setStatus('')
            }, 3000)
        } else {
            // ?? deposit from user wallet
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
                postTransactions(response)

                updatePrice()
                console.log("Topup successful!", txr2);
                setStatus({ message: 'Topup successful!', messageColor: 'text-green-500' })
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
    }
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
                    let fixed = profits?.data.profitValue.toFixed(2)
                    setDailyProfit(fixed) 
                    let fixed1 = profitLvl1?.data.lvl1Profit.toFixed(2)
                    setProfitLvl1(fixed1)
                    let fixed2 = profitLvl2?.data.lvl2Profit.toFixed(2)
                    setProfitLvl2(fixed2)
                    let fixed3 = profitLvl3?.data.lvl3Profit.toFixed(2)
                    setProfitLvl3(fixed3)
                    let fixed4 = total.toFixed(2)
                    setTotalProfit(fixed4)
                } else {
                    console.log('error');
                }

            } catch (error) {
                console.log(error);
            }
        }
        function getDailyProfit(investmentValue) {
            if (investmentValue >= 10 && investmentValue <= 99) {
                return 0.007
            } else if (investmentValue >= 100 && investmentValue <= 499) {
                return 0.008
            } else if (investmentValue >= 500 && investmentValue <= 999) {
                return 0.009
            } else if (investmentValue >= 1000 && investmentValue <= 4999) {
                return 0.01
            } else if (investmentValue >= 5000 && investmentValue <= 9999) {
                return 0.011
            } else if (investmentValue >= 10000 && investmentValue <= 19999) {
                return 0.012
            } else if (investmentValue >= 20000 && investmentValue <= 29999) {
                return 0.013
            } else if (investmentValue >= 30000 && investmentValue <= 49999) {
                return 0.014
            } else if (investmentValue >= 50000 && investmentValue <= 100000) {
                return 0.015
            } else {
                return 0
            }
        }
        async function getUser() {
            try {
                const response = await axios.get(`/api/getPrice?address=${encodeURIComponent(address)}`)
                const price = await response.data.price.price
                const dailyProfit = await response.data.dailyProfit.dailyProfit
                const investmentValue = await response.data.investmentValue.investmentValue
                console.log('price: ', price, investmentValue);
                const allProfits = price - investmentValue
                setAllProfit(allProfits)
                const decuple = dailyProfit * 10
                console.log(allProfits >= decuple);
                const getableProfitValue = allProfits - decuple
                console.log(allProfits);
                setGetableProfit(getableProfitValue)
                const getablePro = getableProfitValue / 10
                const profit = getDailyProfit(investmentValue)
                console.log(getablePro);
                let getable = getablePro / profit
                let fixedPro = getable.toFixed(2) 
                setTopupValue(fixedPro)
                let fixedDecuple = decuple.toFixed(2)
                setLimit(fixedDecuple)
                if (allProfits > decuple) {
                    setShowTopup(true)
                }
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
                    <p className="text-gray-400">your profit limit for withdrawal: </p>
                    <p className="text-white">{limit != 0 ? limit : 0}</p>
                    {isShowTopup && <p className="text-gray-400">you can Topup:
                        <span className="text-white px-2">{topupValue}</span>
                        to get
                        <span className="text-white px-2">{getableProfit}</span>
                    </p>}
                    <form className="flex flex-col gap-5">
                        <input type="number" id="amount" value={amount} onChange={(e) => handleChange(e)} name='amount' className="p-2 rounded text-gray-800 outline-none" placeholder="Enter Amount" />

                        <button type="submit" onClick={(e) => doTopup(e)} className="py-1 px-6 border rounded-full shadow-main border-[#00F0FF]">Topup</button>
                    </form>
                    {status && renderAlert(status)}
                </Container>
            </section>
        </>
    )
}

const renderAlert = ({ message, messageColor }) => (
    <div className={`px-4 py-3 leading-normal ${messageColor} rounded-xl backdrop-blur-sm border border-[#00F0FF] shadow-main mb-5 text-center`}>
        <p>{message}</p>
    </div>
)


export default Wallet