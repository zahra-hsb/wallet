"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAccount, useAccountEffect, useDisconnect } from "wagmi";
import MobileNav from "../MobileNav";
import BrainComponent from "../BrainComponent";
import TicketFeed from "../TicketFeed";
import Referral from "../Referral";
import styles from "../../app/Home.module.css";
import ActivityDashboard from "../ActivityDashboard";
import axios from "axios";
import { createRefCode } from "@/lib/methods";
import TawkMessengerReactUmd from "@tawk.to/tawk-messenger-react";
import Container from "../Container";
import LastTransactions from "../LastTransactions";

const Dashboard = () => {
  const router = useRouter();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const [transactionsArray, setTransactions] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [time, setTime] = useState('')

  const addUser = useCallback(
    async () => {
      try {
        await axios.post("/api/postUser", {
          address: address,
          referralCode: [],
          price: 0,
          investmentValue: 0,
          totalInvestmentLvl1: 0,
          dailyProfit: 0
        });
      } catch (error) {
        console.log(error);
      }
    },
    [address]
  );

  const getUsers = useCallback(
    async () => {
      try {
        const res = await axios.get("/api/getUsers");


        if (res.status !== 200) {
          const errorData = await res.json();
          throw new Error(`Failed to fetch users: ${errorData.message}`);
        }

        // save user
        await addUser();

        return res.data

      } catch (err) {
        console.error("getUsers:50 =>", "Error fetching users:", err);
        return null;
      }
    },
    [address]
  );

  async function getUser() {
    const data = await getUsers()
  }

  useEffect(() => {
    getUser();
    getTransaction()
  }, []);

  // on disconnect from wallet  
  useAccountEffect({
    onDisconnect() {
      router.push("/");
    },
  });

  const today = new Date();
  const formattedDate = today.toDateString();

  async function getTransaction() {
    setTime(formattedDate)
    const transactions = await axios.get(`/api/getTransaction?date=${encodeURIComponent(formattedDate)}?transactionType=withdraw`)
    let total = 0
    transactions.data.transactions?.map(item => {
      total += item.amount
    })
    setTotalSales(total)
    setTransactions(transactions.data.transactions);
  }

  const tawkMessengerRef = useRef();

  
  const onLoad = () => {
    console.log('onLoad works!');
  };
  // if (address === '0x9268Aa2CE60e66587f31CceA16a0a28D1Be48a32')
  if (address === '0xbB7Fca6a970E2D57A1A601BcaBe66834db5a2024')
    return (
      <>
        <MobileNav />
        <section className={'bg-main py-24 px-10 min-h-screen h-full'}>
          <Container>
            <p className="text-lg text-gray-400 font-bold">total sales today:</p>
            <p>{totalSales} USDT</p>
          </Container>
          <Container>
            <p className="text-lg">withdraw requests today: {time}</p>
            {transactionsArray.length != 0 ? transactionsArray.map(item => (
              <>
                <div className="w-full p-5 mx-2 border-b border-b-gray-400">
                  <ul className="w-full flex items-start justify-start gap-24 p-2 font-bold">
                    <li className="text-gray-400">wallet</li>
                    <li>{item.address}</li>
                  </ul>
                  <ul className="w-full flex items-start justify-start gap-20 text-white font-bold p-2">
                    <li className="text-gray-400">amount</li>
                    <li>{item.amount} USDT</li>
                  </ul>
                </div>
              </>
            )) :
            <div className="text-gray-400">there is no any activity today...</div>
            }
          

          </Container>

          <LastTransactions />

        </section>
      </>
    )
  else
    return (
      <>
        <MobileNav />
        <section className={styles.section}>
          <BrainComponent />
          <TicketFeed />
        </section>
        {/* <button onClick={handleMinimize}> Minimize the Chat </button> */}

        <TawkMessengerReactUmd
          propertyId="669b6f9932dca6db2cb285bf"
          widgetId="1i37io1qj"
          ref={tawkMessengerRef}
          onLoad={onLoad}
        />
        {/* <button onClick={() => putBonus()}>edit friend</button> */}
      </>
    );
};

export default Dashboard;
