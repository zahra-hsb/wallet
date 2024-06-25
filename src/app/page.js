import Image from "next/image";
import bg from '../../public/bg/opacity.png'
import RootLayout from "./layout";



export default function Home() {
  // const { open } = useWeb3Modal()

  return (
    <>
      <RootLayout>
        <section className="bg-main w-full h-screen relative">
          <Image src={bg} alt="bg" className="w-full" />
          <div className="absolute bottom-0 flex flex-col items-center gap-5 p-5 rounded-t-3xl h-[50%] w-[85%] backdrop-blur-xl text-white mb-0 m-8 border-2 border-b-0 border-[#20A1FF]">
            <h4 className="text-xl font-bold">Login form</h4>
            <p className="text-gray-300">Choose how you want to connect. <br />
              There are several wallet providers.</p>
            
          </div>

        </section>
        {/* <button onClick={() => open()}>Connect Wallet</button> */}
      </RootLayout>
    </>
  );
}
