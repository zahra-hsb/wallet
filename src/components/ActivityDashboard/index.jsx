'use client'
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import chainIcon from '../../../public/icons/Icon.png'
import chainIcon1 from '../../../public/icons/Icon-chain.png'
import chainIcon2 from '../../../public/icons/Icon-chain1.png'
import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { useWebSockets } from "@/customHooks/useWebSockets";
import { revalidatePath } from "next/cache";

const ActivityDashboard = () => {
    const [friends, setFriends] = useState([])
    const { address } = useAccount()
    // const { address1, connect, subscribe, message, error } = useWebSockets();

    // useEffect(() => {
    //     connect();
    // }, [connect]);

    // useEffect(() => {
    //     if (address1) {
    //         subscribe('friend-list-updates', async () => {
    //             // Fetch updated friends from database or cache (modify as needed)
    //             const updatedFriends = await fetchFriends(address1);
    //             setFriends(updatedFriends);
    //         });
    //     }
    // }, [address1, subscribe]);

    // useEffect(() => {
    //     if (error) {
    //         console.error('WebSocket error:', error);
    //         // Implement error handling UI or retry logic
    //     }
    // }, [error]);

    // const fetchFriends = async (userAddress) => {
    //     try {
    //         const response = await fetch(`/api/getFriends?address=${userAddress}`);
    //         const data = await response.json();
    //         return data?.friends || [];
    //     } catch (err) {
    //         console.error('Error fetching friends:', err);
    //         // Handle errors gracefully
    //         return [];
    //     }
    // };

    useEffect(() => {
        const fetchFriends = async () => {
          try {
            const response = await fetch('/api/getUsers');
    
            if (!response.ok) {
              throw new Error(`Error fetching friends: ${response.statusText}`);
            }
            
            const data = await response.json();
            const userFriends = data.find(item => item.address === address)?.friends;
            console.log(userFriends);
            if (userFriends) {
              setFriends(userFriends);
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
        <>
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
                        {friends.length > 0 ? friends?.map((item, index) => (
                            <>
                                <div className="flex gap-2 p-2 w-full">
                                    <span className={`bg-${item.color} rounded-full px-3 py-1`}>
                                        <Image src={chainIcon} alt="" />
                                    </span>
                                    <div className="overflow-hidden">
                                        <h3 className="text-white">
                                            {item.address}
                                            </h3>
                                        <p className="text-gray-500">
                                            {item.level}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )) :
                            friends.length === 0 ?
                                <div className="p-10 py-24">there is not any activities...</div> :
                                <div className="p-10 py-24">Loading...</div>}
                    </div>

                </div>
            </section>
        </>
    )
}

export default ActivityDashboard