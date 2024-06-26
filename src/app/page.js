import Image from "next/image";
import RootLayout from "./layout";
import Login from "@/components/Login";



export default function Home() {
  // const { open } = useWeb3Modal()
  
  return (
    <>
      <RootLayout>
        <Login />
        {/* <button onClick={() => open()}>Connect Wallet</button> */}
      </RootLayout>
    </>
  );
}
