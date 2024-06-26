import Image from 'next/image';
import { useRouter } from 'next/router';
import Icon1 from '../../../public/icons/SVG.png'
import { useAccount } from 'wagmi';

const Account = () => {
    // const router = useRouter()
    const account = useAccount()
    return (
        <>
           <p>{account.address}</p>
        </>
    )
}

export default Account