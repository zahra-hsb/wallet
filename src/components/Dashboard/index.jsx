'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAccount, useAccountEffect, useDisconnect } from "wagmi"
import MobileNav from "../MobileNav"
import BrainComponent from "../BrainComponent"
import TicketFeed from "../TicketFeed"
import Referral from "../Referral"
import styles from '../../app/Home.module.css'
import ActivityDashboard from "../ActivityDashboard"

const Dashboard = () => {
    const router = useRouter()
    // const { disconnect } = useDisconnect()
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

    // useEffect(() => {
    //     if (!isConnected) {
    //         router.push('/')
    //     }
    // }, [isConnected])

    useAccountEffect({
        onDisconnect() {
          router.push('/')
        }
    })
    return (
        <>
            <MobileNav />
            <section className={styles.section}>
                <BrainComponent />
                <TicketFeed />
            </section>
            {/* <button onClick={() => disconnect}>disconnect</button> */}
        </>
    )
}

export default Dashboard