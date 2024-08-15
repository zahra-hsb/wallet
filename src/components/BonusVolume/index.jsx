'use client'  
import axios from "axios";  
import { useEffect, useState } from "react";  
import { useAccount } from "wagmi";  

const BonusVolume = () => {  
    const { address } = useAccount();  
    const [isReceivedBonus, setReceivedBonus] = useState(false);  
    const [activeTarget, setActiveTarget] = useState(null);  
    const [receivedStatuses, setReceivedStatuses] = useState({}); // جدید  

    const dataArray2 = [  
        { target: '10000', bonus: 200 },  
        { target: '20000', bonus: 500 },  
        { target: '50000', bonus: 1500 },  
        { target: '100000', bonus: 3000 },  
        { target: '200000', bonus: 6000 },  
        { target: '500000', bonus: 20000 },  
        { target: '1000000', bonus: 50000 },  
    ];  

    const handleCollectBonus = async (bonus) => {  
        try {  
            console.log(bonus, address);  
            await axios.put('/api/collectBonus', { address, bonus });  
            setReceivedBonus(true);  
        } catch (error) {  
            console.error('Error collecting bonus: ', error);  
        }  
    };  

    useEffect(() => {  
        const fetchBonus = async () => {  
            try {  
                const response = await axios.put('/api/putBonus', { address });  
                if (response.data.hasReceivedBonus === false) {  
                    const bonusValue = response.data.bonus;  
                    const targetItem = dataArray2.find(item => item.bonus === bonusValue);  

                    const user = await axios.post('/api/postTarget', { address, isReceived: isReceivedBonus, bonus: targetItem.bonus });  

                    if (targetItem) {  
                        const isReceivedArray = user.data.user.targets;  
                        const isReceivedFilter = isReceivedArray.filter(item => item.isReceived === true);  

                        // به روز رسانی وضعیت دریافت  
                        const newStatuses = {};  
                        isReceivedArray.forEach(item => {  
                            newStatuses[item.bonus] = item.isReceived; // هر بونوس به وضعیت دریافتش نسبت داده می‌شود  
                        });  
                        setReceivedStatuses(newStatuses); // به روز رسانی وضعیت  

                        // اگر وضعیت دریافت فعالی وجود داشته باشد  
                        if (isReceivedFilter.length > 0) {  
                            setActiveTarget(targetItem.target);  
                        }  
                    }  
                }  
                setReceivedBonus(response.data.hasReceivedBonus);  
            } catch (error) {  
                console.error('Error fetching investments: ', error);  
            }  
        };  

        fetchBonus();  
    }, [address]);  

    return (  
        <>  
            <table className="text-white w-full ">  
                <thead>  
                    <tr>  
                        <th className="text-gray-400 py-5">Target</th>  
                        <th className="text-gray-400 py-5">Bonus</th>  
                        <th className="text-gray-400 py-5">Collect Bonus</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {dataArray2.map((item, index) => (  
                        <tr key={index} className="text-center py-2 border-y border-y-gray-700">  
                            <td className="py-5">{item.target}</td>  
                            <td className="py-5">{item.bonus}</td>  
                            <td className="py-5">  
                                {isReceivedBonus && activeTarget === item.target ? (  
                                    <button className="py-1 px-6 border rounded-full shadow-green border-[#20FF44]" disabled={true}>Received</button>  
                                ) : (  
                                    <button   
                                        onClick={() => handleCollectBonus(item.bonus)}   
                                        className={`py-1 px-6 border rounded-full ${activeTarget === item.target ? 'border-[#00F0FF] shadow-main' : 'bg-gray-300'}`}   
                                        disabled={activeTarget !== item.target || receivedStatuses[item.bonus]}>  
                                        {receivedStatuses[item.bonus] ? 'Received' : 'Collect'}  
                                    </button>  
                                )}  
                            </td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </>  
    );  
}  

export default BonusVolume;