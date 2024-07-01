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
        navigator.clipboard.writeText('https://regalchain.vercel.app/' + result);
        // if (document.execCommand('copy', false , result)) {
        setTimeout(() => {
            setCopy(true)
        }, 1000)
        // }
        // console.log(navigator.clipboard.writeText(result))
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