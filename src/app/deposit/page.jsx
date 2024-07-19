import Deposit from "@/components/Deposit"
import MobileNav from "@/components/MobileNav"

const deposit = () => {
    const dataArray = [
        ['10$', '99.9$', '1 %'],
        ['100$', '999.9$', '1.1 %'],
        ['1000$', '2499.9$', '1.2 %'],
        ['2500$', '4999.9$', '1.3 %'],
        ['5000$', '9999.9$', '1.4 %'],
        ['10000$', '24999.9$', '1.5 %'],
    ]
    return (
        <>
            <MobileNav />
            <div className="bg-main py-24 px-10 h-full">
                <Deposit />
                <div className="w-full">
                    <table className="text-white w-full ">
                        <tr className="">
                            <th className="text-gray-400 py-5">from</th>
                            <th className="text-gray-400 py-5">to</th>
                            <th className="text-gray-400 py-5">APR</th>
                        </tr>

                        {dataArray?.map(item => (
                            <>
                                <tr className="text-center py-2 border-y border-y-gray-700">
                                    {item.map(item => (
                                        <>
                                            <td className="py-5">{item}</td>
                                        </>
                                    ))}
                                </tr>
                            </>
                        ))}

                    </table>
                </div>
            </div>
        </>
    )
}

export default deposit