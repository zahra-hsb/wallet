'use client'
const Guide = () => {

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
    const dataArray2 = [
        ['10000', '200'],
        ['20000', '500'],
        ['50000', '1500'],
        ['100000', '3000'],
        ['200000', '6000'],
        ['500000', '20000'],
        ['1000000', '50000'],
    ]
    return (
        <>
            <table className="text-white w-full ">
                <tr className="">
                    <th className="text-gray-400 py-5">Target</th>
                    <th className="text-gray-400 py-5">Bonus</th>
                </tr>

                {dataArray2?.map(item => (
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
        </>
    )
}

export default Guide