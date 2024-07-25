import Guide from "@/components/Guide"
import MobileNav from "@/components/MobileNav"

const guide = () => {
    return (
        <>
            <MobileNav />
            <div className="bg-main py-24 px-10 min-h-screen h-full">
                <Guide />
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
                        
                    </tr>
                    <tr className="border-y border-y-gray-700">
                        <th className="text-white py-5">Level 2</th>
                        <th className="text-white py-5">10%</th>

                    </tr>
                    <tr className="border-y border-y-gray-700">
                        <th className="text-white py-5">Level 3</th>
                        <th className="text-white py-5">5%</th>

                    </tr>
                    {/* {dataArray2?.map(item => (
                        <>
                            <tr className="text-center py-2 border-y border-y-gray-700">
                                {item.map(item => (
                                    <>
                                        <td className="py-5">{item}</td>
                                    </>
                                ))}
                            </tr>
                        </>
                    ))} */}

                </table>
            </div>
        </>
    )
}

export default guide