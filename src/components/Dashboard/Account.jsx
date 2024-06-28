import Image from 'next/image';
import { useRouter } from 'next/router';
import Icon1 from '../../../public/icons/SVG.png'
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

const Account = () => {
    // const router = useRouter()
    const account = useAccount()
    const { open, close } = useWeb3Modal()
    return (
        <>
            <button onClick={() => open({ view: 'Account' })}>{account.address}</button>
        </>
    )
}

export default Account