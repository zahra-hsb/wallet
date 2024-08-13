'use client'  
import Image from "next/image";  
import { IoIosArrowDown } from "react-icons/io";  
import chainIcon from '../../../public/icons/Icon.png'  
import { useEffect, useState } from "react";  
import axios from "axios";  
import { useAccount } from "wagmi";  

const ActivityDashboard = () => {  
    const [friends, setFriends] = useState([]);  
    const [investValues, setInvestValues] = useState([]);  
    const { address } = useAccount();  

    useEffect(() => {  
        const fetchInvestments = async () => {  
            try {  
                const response = await axios.put('/api/putBonus', { address });  
                return response.data.lvlInvestsArray; 
            } catch (error) {  
                console.error('Error fetching investments: ', error);  
                return []; // در صورت بروز خطا یک آرایه خالی برمی‌گرداند  
            }  
        };  

        const fetchFriends = async () => {  
            try {  
                const response = await fetch('/api/getUsers');  

                if (!response.ok) {  
                    throw new Error(`Error fetching friends: ${response.statusText}`);  
                }  

                const data = await response.json();  
                const userFriends = data.find(item => item.address === address)?.friends || [];  
                const investments = await fetchInvestments();  
                console.log(investments);
                if (userFriends.length > 0) {  
                    setFriends(userFriends);  
                    setInvestValues(investments); // فرض بر این است که 'investments' آرایه‌ای از مقادیر است  
                } else {  
                    console.warn(`No friends found for address: ${address}`);  
                }  
            } catch (error) {  
                console.error('Error fetching friends:', error);  
            }  
        };  

        fetchFriends();  
    }, [address]);  

    return (  
        <section className="pt-10">  
            <div className='border shadow-main backdrop-blur-sm text-white border-[#00F0FF] rounded-3xl flex items-center flex-col'>  
                <div className="flex justify-between items-center p-4 w-full border-b border-b-[#00F0FF]">  
                    <p>Recent Activity</p>  
                    <span className="flex items-center gap-2 cursor-pointer rounded-full border border-[#00F0FF] py-1 px-4">  
                        Today  
                        <IoIosArrowDown />  
                    </span>  
                </div>  
                <div className="w-full p-2">  
                    {friends.length > 0 ? friends.map((item, index) => (  
                        <div className="flex gap-2 p-2 w-full" key={index}>  
                            <span className={`bg-${item.color} rounded-full px-3 py-1`}>  
                                <Image src={chainIcon} alt="" />  
                            </span>  
                            <div className="overflow-hidden">  
                                <h3 className="text-white">{item.address}</h3>  
                                <p className="text-gray-500">{item.level}</p>  
                                <p className="text-gray-500">{investValues[index].investmentValue}</p>
                            </div>  
                        </div>  
                    )) : (  
                        friends.length === 0 ? (  
                            <div className="p-10 py-24">There are no activities...</div>  
                        ) : (  
                            <div className="p-10 py-24">Loading...</div>  
                        )  
                    )}  
                </div>  
            </div>  
        </section>  
    );  
};  

export default ActivityDashboard;