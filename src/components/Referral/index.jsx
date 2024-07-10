'use client'
import { useState } from 'react';
import styles from '../../app/Home.module.css'
import axios from 'axios';
import { useAccount } from 'wagmi';
import { createRefCode } from '@/lib/methods';

const Referral = () => {

    const [isCopied, setCopy] = useState(false)
    const [refCode, setRefCode] = useState('')
    const { address } = useAccount()

    // async function getUsers() {
    //     try {
    //         const res = await axios.get('/api/getUsers')

    //         if (res.status !== 200) {
    //             const errorData = await res.json();
    //             throw new Error(`Failed to fetch users: ${errorData.message}`);
    //         }

    //         const result = res.data?.find(item => item.address === address).referralCode
    //         setRefCode(result)
    //         console.log('fg: ', result.toString());
    //         return result; 
    //     } catch (err) {
    //         console.error("Error fetching users:", err);
    //         return null;
    //     }
    // }

    async function copyRefCode() {
        const result = createRefCode(); 
        if (result) {
            const resultRef = 'https://aismart.liara.run/' + result
            navigator.clipboard.writeText(resultRef);
            setCopy(true);
        }
    }

    return (
        <>
            <section className='pt-5'>
                <div className='border shadow-main text-white border-[#00F0FF] rounded-3xl flex items-center flex-col p-5 gap-5'>
                    <p className='font-bold text-xl'>Referral</p>
                    <button onClick={copyRefCode} className='border cursor-pointer border-[#00F0FF] py-1 px-7 rounded-3xl shadow-main'>Click to Copy!</button>
                    {isCopied && <p className='text-[#00F0FF]'>Referral code copied!</p>}
                </div>
            </section>
        </>
    )
}

export default Referral;