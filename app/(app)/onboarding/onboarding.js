"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaApple, FaGoogle } from "react-icons/fa";
import GetStartedPage from "./get-started";
import WelcomePage from "./welcome";

export default function Onboarding() {
  const router = useRouter();

  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [getStarted, setGetStarted] = useState(false);

  // useEffect(() => {
  //   if (isConnected) {
  //     router.push("/dashboard");
  //   }
  // }, [isConnected, router]);

  // if (getStarted) {
  //   return <GetStartedPage />;
  // } else {
  //   return <WelcomePage setGetStarted={setGetStarted} />;
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {getStarted ? <GetStartedPage /> : <WelcomePage setGetStarted={setGetStarted} />}
    </div>
  )
}
