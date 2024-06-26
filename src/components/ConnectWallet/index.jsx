'use client'
import { useWeb3Modal } from "@web3modal/wagmi/react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { useAccount, useConnect } from "wagmi"
import Icon1 from '../../../public/icons/SVG.png'


const ConnectWallet = () => {

    const router = useRouter()
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
    const { open, close } = useWeb3Modal()
    const { connect } = useConnect()
    useEffect(() => {
        if (isConnecting) return <div>Connecting…</div>
        if (isDisconnected) return <div>Disconnected</div>
        if (isConnected) router.push('/dashboard')
    }, [isConnected])
    return (
        <>
            <div className="w-full">
                {/* <w3m-button /> */}
                <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#20A1FF] cursor-pointer py-2 rounded-full shadow-main" onClick={() => open({ view: 'Connect' })}>
                    <Image src={Icon1} alt='' />
                    Connect Wallet
                </button>
            </div>
        </>
    )
}

export default ConnectWallet