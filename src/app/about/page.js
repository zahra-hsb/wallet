import MobileNav from "@/components/MobileNav"
import { FcAbout } from "react-icons/fc";


const about = () => {
    return (
        <>
            <MobileNav />
            <div className="bg-main py-24 px-10 min-h-screen h-full text-white">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg py-4">About AI market</h3>
                    <FcAbout size={30}/>
                </div>
                <hr />
                <p className="text-justify py-3 leading-8 text-gray-300">
                    By analyzing the movements of digital currency markets using artificial intelligence, you can enhance the accuracy and efficiency of your trades. Artificial intelligence algorithms have the ability to predict the price movements of digital currencies and swiftly make trading decisions by examining volumes and voltages. This combined approach of artificial intelligence and digital currency trading enables optimizing trading performance and increasing profitability. As the digital currency market experiences rapid changes, leveraging AI technology can help you continue your trades with greater speed and accuracy, seizing better market opportunities. Whether you are an investor or trader, using AI algorithms in digital currency trading can assist you in making better decisions and experiencing higher efficiency and profitability in your transactions.

                </p>
            </div>
        </>
    )
}

export default about