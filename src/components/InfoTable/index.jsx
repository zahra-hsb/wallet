'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

const InfoTable = () => {
    const [friends, setFriends] = useState([])
    const [lvl1, setLvl1] = useState([])
    const [lvl2, setLvl2] = useState([])
    const [lvl3, setLvl3] = useState([])
    const { address } = useAccount()

    function getlvl(friends, level) {
        const lvl = friends.filter(item => item.level == level)
        console.log('level: ', lvl);  
        return lvl
    }
    // function getlvl2(friends) {
    //     const lvl2 = friends.find(item => item.level === '2')
    //     setLvl2(lvl2)
    // }
    // function getlvl3(friends) {
    //     const lvl3 = friends.find(item => item.level === '3')
    //     setLvl3(lvl3)
    // }
    useEffect(() => {
        async function getFriends() {
            try {
                const friends = await axios.get(`/api/getFriends?address=${encodeURIComponent(address)}`)
                setFriends(friends.data)
                console.log(friends.data);
                setLvl1(getlvl(friends.data.friends, 1))
                setLvl2(getlvl(friends.data.friends, 2))
                setLvl3(getlvl(friends.data.friends, 3))
            } catch (error) {
                console.log(error);
            }
        }

        getFriends()

    }, [address])
    return (
        <>


            <table className="text-white w-full mt-10">
                <tr className="">
                    <th className="text-gray-400 py-5">Levels</th>
                    <th className="text-gray-400 py-5">Total Profitable Investment</th>
                    <th className="text-gray-400 py-5">Total Users</th>
                    <th className="text-gray-400 py-5">Total Deposit</th>
                </tr>
                <tr className="border-y border-y-gray-700">
                    <th className="text-white py-5">Level 1</th>
                    <th className="text-white py-5">15%</th>
                    <th>{!lvl1 ? '0' : lvl1?.length}</th>
                </tr>
                <tr className="border-y border-y-gray-700">
                    <th className="text-white py-5">Level 2</th>
                    <th className="text-white py-5">10%</th>
                    <th>{!lvl2 ? '0' : lvl2?.length}</th>

                </tr>
                <tr className="border-y border-y-gray-700">
                    <th className="text-white py-5">Level 3</th>
                    <th className="text-white py-5">5%</th>
                    <th>{!lvl3 ? '0' : lvl3?.length}</th>

                </tr>
            </table>

        </>
    )
}

export default InfoTable