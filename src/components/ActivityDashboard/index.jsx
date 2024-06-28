import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import chainIcon from '../../../public/icons/Icon.png'
import chainIcon1 from '../../../public/icons/Icon-chain.png'
import chainIcon2 from '../../../public/icons/Icon-chain1.png'

const ActivityDashboard = () => {
    const dataArray = [
        { url: chainIcon, details: '24/05/2021, 18:24:56', address: '0xb77ad0099e21d4fca87fa4c...', color: 'orange-100' },
        { url: chainIcon1, details: '24/05/2021, 18:24:56', address: '0xb77ad0099e21d4fca87fa4c...', color: 'blue-100' },
        { url: chainIcon, details: '24/05/2021, 18:24:56', address: '0xb77ad0099e21d4fca87fa4c...', color: 'orange-100' },
        { url: chainIcon2, details: '24/05/2021, 18:24:56', address: '0xb77ad0099e21d4fca87fa4c...', color: 'blue-100' },
        { url: chainIcon, details: '24/05/2021, 18:24:56', address: '0xb77ad0099e21d4fca87fa4c...', color: 'orange-100' },
    ]
    return (
        <>
            <section className="p-5">
                <div className='border shadow-main text-white border-[#00F0FF] rounded-3xl flex items-center flex-col'>
                    <div className="flex justify-between items-center p-4 w-full border-b border-b-[#00F0FF]">
                        <p>Recent Activity</p>
                        <span className="flex items-center gap-2 cursor-pointer rounded-full border border-[#00F0FF] py-1 px-4">
                            Today
                            <IoIosArrowDown />
                        </span>
                    </div>
                    <div className="w-full p-2">
                        {dataArray?.map((item, index) => (
                            <>
                                <div className="flex gap-2 p-2 w-full">
                                    <span className={`bg-${item.color} rounded-full px-3 py-1`}>
                                        <Image src={item.url} alt="" />
                                    </span>
                                    <div className="">
                                        <h3 className="text-white">
                                            {item.details}
                                        </h3>
                                        <p className="text-gray-500">
                                            {item.address.slice(10)}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}

export default ActivityDashboard