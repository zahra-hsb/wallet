'use client'
import { useState } from 'react';
import styles from '../../app/Home.module.css'

const Referral = () => {
    // const [referralCode, setReferralCode] = useState('')
    const [isCopied, setCopy] = useState(false)
    function createRefCode() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 12; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const resultRefCode = 'https://regalchain.vercel.app/' + result
        navigator.clipboard.writeText(resultRefCode);
        // if (document.execCommand('copy', false , result)) {
        setTimeout(() => {
            setCopy(true)
        }, 1000)
        // }
        // console.log(navigator.clipboard.writeText(result))
        const isExistRefCode = getUsers()
        
        if(!isExistRefCode) {
            resultRefCode
        } 
    }


    async function getUsers() {
        try {
            const res = await axios.get('/api/getUsers')

            if (res.status !== 200) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch users: ${errorData.message}`);
            }
            const foundReferral = res.data?.find(item => item.address === address).referralCode
            if (foundReferral === '') {
                return false
            } else {
                return true
            }

        } catch (err) {
            console.error("Error fetching users:", err);
            return null;
        }
    }


    return (
        <>
            <section className='pt-5'>
                <div className='border shadow-main text-white border-[#00F0FF] rounded-3xl flex items-center flex-col p-5 gap-5'>
                    <p className='font-bold text-xl '>Referral</p>
                    <button onClick={createRefCode} className='border cursor-pointer border-[#00F0FF] py-1 px-7 rounded-3xl shadow-main'>Click to Copy!</button>
                    {isCopied && <p className='text-[#00F0FF]'>Referral code copied!</p>}
                </div>
            </section>
        </>
    )
}

export default Referral