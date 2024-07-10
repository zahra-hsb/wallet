"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useAccount, useAccountEffect, useDisconnect } from "wagmi";
import MobileNav from "../MobileNav";
import BrainComponent from "../BrainComponent";
import TicketFeed from "../TicketFeed";
import Referral from "../Referral";
import styles from "../../app/Home.module.css";
import ActivityDashboard from "../ActivityDashboard";  
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  // const { disconnect } = useDisconnect()
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  function createRefCode() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const addUser = useCallback(
    async (referral) => {
      try {
        await axios.post("/api/postUser", {
          address: address,
          referralCode: referral,
          price: 0,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [address]
  );

  const getUsers = useCallback(
    async (referral) => {
      try {
        const res = await axios.get("/api/getUsers");

        let isExistUser;
        let foundAddress;
        console.log("getUsers:50 =>", res.data);

        if (res.status !== 200) {
          const errorData = await res.json();
          throw new Error(`Failed to fetch users: ${errorData.message}`);
        } else if (res.data != []) {
          foundAddress =
            res.data?.some((item) => item.address === address) ?? [];
          console.log("getUsers:58 =>", foundAddress);
        }

        if (!!foundAddress?.length) {
          isExistUser = true;
          return;
        } else {
          // save user
          isExistUser = false;
          addUser(referral);
        }

        if (!!foundAddress.length) return;
        // save user
        addUser(referral);
      } catch (err) {
        console.error("getUsers:50 =>", "Error fetching users:", err);
        return null;
      }
    },
    [address]
  );

  async function saveUser() {
    const referral = createRefCode();
    const resultRef = "https://aismart.liara.run/" + referral;
    getUsers(resultRef);
  }
  useEffect(() => {
    saveUser();
  }, []);

  useAccountEffect({
    onDisconnect() {
      router.push("/");
    },
  });
  return (
    <>
      <MobileNav />
      <section className={styles.section}>
        <BrainComponent />
        <TicketFeed />
      </section>
      {/* <button onClick={() => disconnect}>disconnect</button> */}
    </>
  );
};

export default Dashboard;
