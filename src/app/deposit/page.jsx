import Deposit from "@/components/Deposit"
import MobileNav from "@/components/MobileNav"

const deposit = () => {
    const dataArray = [
        ['10$', '99$', '0.7 %'],
        ['100$', '499$', '0.8 %'],
        ['500$', '999$', '0.9 %'],
        ['1000$', '4999$', '1 %'],
        ['5000$', '9999$', '1.1 %'],
        ['10000$', '19999$', '1.2 %'],
        ['20000$', '29999$', '1.3 %'],
        ['30000$', '49999$', '1.4 %'],
        ['50000$', '100000$', '1.5 %'],
    ]
    

    return (
        <>
            <MobileNav />
            <div className="bg-main py-24 px-10 min-h-screen h-full">
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