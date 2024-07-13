'use client'
import axios from "axios"
import { useEffect, useState } from "react"

const UsersComponent = () => {
    const [usersArray, setUsersArray] = useState([])
    async function getUsers() {
        try {
            const users = await axios.get('/api/getUsers')
            console.log(users);
            setUsersArray(users.data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            <section className="bg-main py-24 px-10">
                <ul className="text-white grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {usersArray.length !== 0 ? usersArray?.map((item, index) => (
                        <>
                            <li className="flex flex-col" key={index}>
                                <span>address: {item.address}</span>
                                <span>referral: {item.referralCode}</span>
                                <span>value of investment: {item.price}</span>
                                {/* <span>{item.address}</span> */}
                            </li>
                        </>
                    )) :
                        <div>loading...</div>}
                </ul>
            </section>
        </>
    )
}

export default UsersComponent