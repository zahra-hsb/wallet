'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

const InfoTable = () => {
    const [friends, setFriends] = useState([])
    const [lvl1, setLvl1] = useState([])
    const [lvl2, setLvl2] = useState([])
    const [lvl3, setLvl3] = useState([])

    const [deposit1, setDeposit1] = useState([])
    const [deposit2, setDeposit2] = useState([])
    const [deposit3, setDeposit3] = useState([])
    const { address } = useAccount()

    function getlvl(friends, level) {
        const lvl = friends.filter(item => item.level == level)
        return lvl
    }

    useEffect(() => {
        async function getFriends() {
            try {
                const friends = await axios.get(`/api/getFriends?address=${encodeURIComponent(address)}`)
                setFriends(friends.data)

                setLvl1(getlvl(friends.data.friends, 1))
                setLvl2(getlvl(friends.data.friends, 2))
                setLvl3(getlvl(friends.data.friends, 3))
                return friends.data.friends
            } catch (error) {
                console.log(error);
            }
        }

        const friendsArray = getFriends()
        async function getDeposits(address) {
            try {
                const deposits = await axios.get(`/api/getDeposits?address=${encodeURIComponent(address)}`)
                console.log(deposits.data);
                let sum1 = 0
                deposits.data[0].map(item => sum1 += item.price )
                console.log('object: ', sum1);
                setDeposit1(sum1)
                let sum2 = 0
                deposits.data[1].map(item => sum2 += item.price )
                console.log('object: ', sum2);
                setDeposit2(sum2)
                let sum3 = 0
                deposits.data[2].map(item => sum3 += item.price )
                console.log('object: ', sum3);
                setDeposit3(sum3)
            } catch (error) {
                console.log(error);
            }
        }

        getDeposits(address)

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
                    <th>{!lvl1 ? 'Loading...' : lvl1?.length}</th>
                    <th>{deposit1 ? deposit1 : '0'}</th>
                </tr>
                <tr className="border-y border-y-gray-700">
                    <th className="text-white py-5">Level 2</th>
                    <th className="text-white py-5">10%</th>
                    <th>{!lvl2 ? 'Loading...' : lvl2?.length}</th>
                    <th>{deposit2 ? deposit2 : '0'}</th>

                </tr>
                <tr className="border-y border-y-gray-700">
                    <th className="text-white py-5">Level 3</th>
                    <th className="text-white py-5">5%</th>
                    <th>{!lvl3 ? 'Loading...' : lvl3?.length}</th>
                    <th>{deposit3 ? deposit3 : '0'}</th>

                </tr>
            </table>

        </>
    )
}

export default InfoTable