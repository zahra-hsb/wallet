"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
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

const Dashboard = () => {
  const router = useRouter();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();



  const dataArray = [
    ['10$', '99.9$', '1 %'],
    ['100$', '999.9$', '1.1 %'],
    ['1000$', '2499.9$', '1.2 %'],
    ['2500$', '4999.9$', '1.3 %'],
    ['5000$', '9999.9$', '1.4 %'],
    ['10000$', '24999.9$', '1.5 %'],
  ]

  const addUser = useCallback(
    async () => {
      try {
        await axios.post("/api/postUser", {
          address: address,
          referralCode: '',
          price: 0,
          totalInvestment: 0,
          totalInvestmentLvl1: 0
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
        console.log('responce=> ', res.data);
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

  async function editFriends() {
    try {
      // const link = 'https://aismart.liara.run' + pathname
      const address = 'https://aismart.liara.run/lJLXVixVNVay'
      const level = 1
      const link = ''
      const data = [
        { address, level }
      ]
      await axios.put('/api/editFriends', { link, data })
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getUser();
  }, []);

  // on disconnect from wallet  
  useAccountEffect({
    onDisconnect() {
      router.push("/");
    },
  });

  const tawkMessengerRef = useRef();

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };
  const onLoad = () => {
    console.log('onLoad works!');
  };
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
      {/* <button onClick={() => editFriends()}>edit friend</button> */}
    </>
  );
};

export default Dashboard;
