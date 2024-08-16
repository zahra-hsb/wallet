import Image from "next/image"
import commision from '../../../public/icons/Data.png'
import deposit from '../../../public/icons/Row.png'
import withdraw from '../../../public/icons/Body.png'


const LastTransactions = () => {
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
        </>
    )
}

export default LastTransactions