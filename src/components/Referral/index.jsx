'use client'
import { useEffect, useState } from 'react';
import styles from '../../app/Home.module.css'
import axios from 'axios';
import { useAccount } from 'wagmi';
import { createRefCode } from '@/lib/methods';

const Referral = () => {

    const [isCopied, setCopy] = useState()
    const [refCode, setRefCode] = useState('')
    const { address } = useAccount()

    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|ipod|iphone/i);
    }
    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    function copy(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };
    function select(e) {
        const text = e.target.value
        e.target.select()
    }


    async function getUsers() {
        try {
            const res = await axios.get('/api/getUsers')

            if (res.status !== 200) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch users: ${errorData.message}`);
            }

            const result = res.data?.find(item => item.address === address).referralCode
            return result;
        } catch (err) {
            console.error("Error fetching users:", err);
            return null;
        }
    }

    async function updateUser(resultRef, address) {
        try {
            await axios.put('/api/editRef', { address, resultRef })
        } catch (error) {
            console.log(error);
        }
    }

    async function copyRefCode() {
        let result;
        const foundRef = await getUsers()
        if (foundRef) {
            copy(foundRef)
            setCopy(true);
            setRefCode(foundRef)
            setTimeout(() => {
                setCopy(false);
            }, 3000)
            return null
        } else {
            result = createRefCode();
            const resultRef = 'https://aismart.liara.run/' + result
            setRefCode(resultRef)
            updateUser(resultRef, address)
            copy(resultRef)
            setCopy(true);
            setTimeout(() => {
                setCopy(false);
            }, 3000)
        }

    }
    useEffect(() => {
        async function getReferal() {
            const result = await getUsers()
            setRefCode(result)
        }
        getReferal()
    }, [])
    return (
        <>
            <section className='pt-5'>
                <div className='border shadow-main text-white border-[#00F0FF] rounded-3xl flex items-center flex-col p-6 gap-5'>
                    <p className='font-bold text-xl'>Referral</p>
                    <button onClick={copyRefCode} className='border cursor-pointer border-[#00F0FF] py-1 px-7 rounded-3xl shadow-main'>Click to Copy!</button>
                    {isCopied && <p className='text-[#00F0FF]'>Referral code copied! (Didn`t get your code on iphone? use the link below👇)</p>}
                    <input type="text" onClick={(e) => select(e)} className="w-full p-2 rounded text-gray-800 outline-none" contentEditable={false} value={refCode} />
                </div>
            </section>
        </>
    )
}

export default Referral;