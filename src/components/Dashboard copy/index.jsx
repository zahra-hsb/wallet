import MobileNav from '../MobileNav'
import Referral from '../Referral'
import styles from '../../../styles/Home.module.css';
import BrainComponent from '../../components/BrainComponent'
import TicketFeed from '../../components/TicketFeed'
import { useAccountEffect, useDisconnect } from 'wagmi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Dashboard = () => {
    const { disconnect } = useDisconnect()
    const router = useRouter()
    useAccountEffect({
        onDisconnect() {
          router.push('/')
        },
    })
    return (
        <>
            <MobileNav />
            <section className={styles.section}>
                <BrainComponent />
                <TicketFeed />
                <Referral />
                
            </section>
        </>
    )
}

export default Dashboard