'use client'
import { useEffect, useState } from 'react';
import styles from '../../app/Home.module.css'
import axios from 'axios';
import { useAccount } from 'wagmi';
import { createRefCode } from '@/lib/methods';
import ReferralBox from '../ReferralBox';

const Referral = () => {

    const [refCode, setRefCode] = useState('')
    const [err, setErr] = useState('')
    const { address } = useAccount()
    const [refBoxes, setRefBox] = useState([])
    let line = 1




    function select(e) {
        const text = e.target.value
        e.target.select()
    }

    async function getPrice() {
        try {
            const result = await axios.get(`/api/getPrice?address=${encodeURIComponent(address)}`)
            return result.data.price.price
        } catch (error) {
            console.log(error);
        }
    }
    async function getUsers() {
        try {
            const res = await axios.get('/api/getUsers')

            if (res.status !== 200) {
                const errorData = await res.json();
                throw new Error(`Failed to fetch users: ${errorData.message}`);
            }

            const result = res.data?.find(item => item.address === address).referralCode
            console.log(result);
            setRefBox(result)
            return result;
        } catch (err) {
            console.error("Error fetching users:", err);
            return null;
        }
    }

    async function updateUser(resultRef, address, line) {
        try {
            await axios.put('/api/editRef', { address, resultRef, line })
        } catch (error) {
            console.log(error);
        }
    }


    async function addRefBox() {
        const price = await getPrice()
        console.log(price);
        if (price != 0) {
            let result = createRefCode();
            const resultRef = 'https://aismart.liara.run/' + result
            setRefBox([...refBoxes, resultRef]);
            updateUser(resultRef, address, line)

        } else {
            setErr('please do deposit then get your referral code!')
            setTimeout(() => {
                setErr('')
            }, 5000)
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
                {/* <ReferralBox index={-1} copyRefCode={copyRefCode} isCopied={isCopied} err={err} refCode={refCode} select={select} /> */}
                {refBoxes.length != 0 ? refBoxes.map((code, index) => (
                    <>
                        <ReferralBox key={index} index={index} err={err} refCode={code.refCode} select={select} />
                    </>
                ))
                    :
                    <div className='text-white text-center py-5'>
                        please click on the add button for create your referral code!
                    </div>
                }
                {err &&
                    <>
                        <div className='text-red-500 text-center'>
                            {err}
                        </div>
                    </>
                }
                <div className='flex items-center w-full justify-center py-2'>
                    <button onClick={addRefBox} className='border border-[#00F0FF] shadow-main rounded-full text-white px-3 py-1'>+</button>
                </div>
            </section>
        </>
    )
}

export default Referral;