import Image from "next/image"
import commision from '../../../public/icons/Data.png'
import deposit from '../../../public/icons/Row.png'
import withdraw from '../../../public/icons/Body.png'


const LastTransactions = ({ transactionsArray }) => {
    const dataArray = [
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: deposit, title: 'deposit', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FFF50A' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: withdraw, title: 'withdraw', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#FD625E' },
        { icon: commision, title: 'commision', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Amount', color: '#00FF7F' },
        { icon: commision, title: '(Number_ID)', date: '14 Mar, 2021', title1: 'n(Matic)', action: 'Panel', color: '#00FF7F' },
    ]
    return (
        <>
            <div className='shadow-main backdrop-blur-sm text-white flex flex-col items-center gap-2 border border-[#00F0FF] rounded-2xl m-8 pt-3'>
                <h3 className='font-bold text-lg'>Transactions</h3>
                <div className='w-full flex flex-col overflow-hidden gap-5 items-center border border-[#00F0FF] rounded-2xl p-3'>
                    {transactionsArray?.map((item, index) => (
                        <>
                            <div className="w-full flex flex-col items-center gap-2 justify-around border-b p-2">
                                <p className="text-gray-400 px-5 text-left w-9/10 text-sm ">{item.address}</p>
                                <div key={index} className="w-full flex justify-around">
                                    <div className="flex gap-3 items-center">

                                        <Image width={20} height={20} src={item.status === 'pending' ? deposit : withdraw} alt="" />
                                        <span>
                                            <p className={item.status === 'pending' ? `text-[#FFF50A]` : item.transactionType === 'withdraw' ? 'text-[#FD625E]' : 'text-[#00FF7F]'}>{item.transactionType}</p>
                                            <p>{item.date}</p>
                                        </span>
                                    </div>
                                    <span>
                                        <p className={item.status === 'pending' ? `text-[#FFF50A]` : item.transactionType === 'withdraw' ? 'text-[#FD625E]' : 'text-[#00FF7F]'}>{item.status}</p>
                                        <p>{item.amount} USDT</p>
                                    </span>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default LastTransactions