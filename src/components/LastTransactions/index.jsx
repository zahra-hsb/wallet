import Image from "next/image"
import commision from '../../../public/icons/Data.png'
import deposit from '../../../public/icons/Row.png'
import withdraw from '../../../public/icons/Body.png'
import { useEffect, useState } from "react"


const LastTransactions = ({ transactionsArray, approve, decline }) => {
    const [time, setTime] = useState('')
    const dataArray = [
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: deposit, title: 'deposit', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FFF50A' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: commision, title: '(Number_ID)', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#00FF7F' },
    ]
    const today = new Date();
    const formattedDate = today.toDateString();
    useEffect(() => {
        setTime(formattedDate)
    }, [])
    return (
        <>
            <div className='shadow-main backdrop-blur-sm text-white flex flex-col items-center gap-2 border border-[#00F0FF] rounded-2xl m-8 pt-3'>
                <h3 className='font-bold text-lg'>Transactions</h3>
                <h3 className=' text-md'>{time}</h3>
                {transactionsArray.length > 0 ?
                    <div className='w-full h-screen flex flex-col overflow-auto gap-5 items-center border border-[#00F0FF] rounded-2xl p-3'>
                        {transactionsArray?.map((item, index) => (
                            <>
                                <div className="w-full flex flex-col items-center gap-2 justify-around border-b p-5">
                                    <p className="text-gray-400 px-5 text-right break-words text-sm ">{item.address}</p>
                                    <div key={index} className="w-full flex justify-around gap-5">
                                        <div className="flex gap-3 items-center">

                                            <Image width={20} height={20} className={item.status === 'approve' && `rotate-180`} src={item.status === 'pending' ? deposit : item.status === 'decline' ? withdraw : commision} alt="" />
                                            <span>
                                                <p className={item.status === 'pending' ? `text-[#FFF50A]` : item.status === 'approve' ? 'text-[#00FF7F]' : item.transactionType === 'withdraw' ? 'text-[#FD625E]' : ''}>{item.transactionType}</p>
                                                <p>{item.date}</p>
                                                <p>{item.time}</p>
                                            </span>
                                        </div>
                                        <span className="flex flex-col items-center justify-center mx-8">
                                            <p className={item.status === 'pending' ? `text-[#FFF50A]` : item.status === 'approve' ? 'text-[#00FF7F]' : item.transactionType === 'withdraw' ? 'text-[#FD625E]' : ''}>{item.status}</p>
                                            <p>{item.amount} USDT</p>
                                        </span>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => approve(item._id)} className={`py-1 px-6 border rounded-full ${item.status === 'approve' || item.status === 'decline' ? `bg-gray-500 cursor-not-allowed` : `shadow-green border-[#20FF44]`} text-center `} disabled={item.status === 'approve' || item.status === 'decline' ? true : false}>approve</button>
                                            <button onClick={() => decline(item._id, item.address, item.amount)} className={`py-1 px-6 border rounded-full text-center  ${item.status === 'approve' || item.status === 'decline' ? `bg-gray-500 cursor-not-allowed` : `shadow-red border-[#FD625E]`}`} disabled={item.status === 'approve' || item.status === 'decline' ? true : false} >decline</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}

                    </div>
                    :
                    <div className="text-white text-center border w-full h-32 flex items-center justify-center border-[#00F0FF] rounded-2xl p-3">there is no any activity...</div>
                }

            </div>
        </>
    )
}

export default LastTransactions