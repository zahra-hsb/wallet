import DashboardIcon from '../../../public/icons/dashboard.png'
import DipositIcon from '../../../public/icons/deposit.png'
import Withdraw from '../../../public/icons/withdraw.png'
import Referral from '../../../public/icons/referral.png'
import Support from '../../../public/icons/support.png'
import Logout from '../../../public/icons/logout.png'
import Link from 'next/link'

const MobileMenu = () => {
    const menuArray = [
        { name: 'Dashboard', url: '/dashboard', icon: <DashboardIcon /> },
        { name: 'Deposit', url: '/diposit', icon: <DipositIcon /> },
        { name: 'Withdraw', url: '/withdraw', icon: <Withdraw /> },
        { name: 'Referral', url: '/referral', icon: <Referral /> },
        { name: 'Support', url: '/support', icon: <Support /> },
        { name: 'Logout', url: '/logout', icon: <Logout /> },
    ]
    return (
        <>

            <ul className='bg-[#0000004D] flex flex-col items-start justify-start gap-5 fixed top-0 left-0'>
                {menuArray?.map((item, index) => (
                    <>
                        <li key={index}>
                            {item.icon}
                            <Link href={item.url}>{item.name}</Link>
                        </li>
                    </>
                ))}
            </ul>
        </>
    )
}

export default MobileMenu