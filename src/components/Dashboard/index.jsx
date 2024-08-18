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
  const [isApprove, setApprove] = useState(false)

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
    const transactionsDeposit = await axios.get(`/api/getTransaction?date=${encodeURIComponent(formattedDate)}&transactionType=deposit`)
    const transactions = await axios.get(`/api/getTransaction?date=${encodeURIComponent(formattedDate)}&transactionType=withdraw`)
    let total = 0
    transactionsDeposit.data.transactions?.map(item => {
      total += item.amount
    })
    setTotalSales(total)
    setTransactions(transactions.data.transactions);
  }

  const tawkMessengerRef = useRef();
  const decline = async (id, address, amount) => {
    console.log('id: ', id);
    try {
      await axios.put('/api/putTransaction', { status: 'decline', _id: id })
      await axios.put('/api/editPrice', { address: address, price: amount })
      window.location.reload()

    } catch (error) {
      console.log(error);
    }
  }
  const approve = async (id) => {
    console.log('time: ', id);
    try {
      await axios.put('/api/putTransaction', { status: 'approve', _id: id })
      // setApprove(true)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  const onLoad = () => {
    console.log('onLoad works!');
  };
  if (address === '0x9268Aa2CE60e66587f31CceA16a0a28D1Be48a32' ||
    address === '0x707dbEB3e7CC1eAC69471ccFC44FfdeC096eC028' ||
    address === '0x1C4C36C3c6AE93fb58a2C0413E589F4D3A22C2DA'
  ) {
    // if (address === '0xbB7Fca6a970E2D57A1A601BcaBe66834db5a2024') {
    return (
      <>
        <MobileNav />
        <section className={'bg-main py-24 min-h-screen h-full'}>
          <Container>
            <p className="text-lg text-gray-400 font-bold">total sales today:</p>
            <p>{totalSales} USDT</p>
          </Container>
          <LastTransactions isApprove={isApprove} approve={approve} decline={decline} transactionsArray={transactionsArray} />
        </section>
      </>
    )
  } else {
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
}
export default Dashboard;
