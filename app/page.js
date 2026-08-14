'use client'

import AddOns from "@/components/AddOns/AddOns";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import SelectPlan from "@/components/SelectPlan/SelectPlan";
import Summary from "@/components/Summary/Summary";
import { useEffect, useState } from "react";

export default function Home() {

  const totalSteps = 4;
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('multi-step')
    if (saved) setData(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('multi-step', JSON.stringify(data))
  }, [data])

  const steps = [
    {
      id: 'personal',
      title: "Personal Info",
      desc: "Please provide your name, email address, and phone number.",
      component: (
        <PersonalInfo />
      )
    },
    {
      id: 'plan',
      title: "Select your plan",
      desc: "You have the option of monthly or yearly billing.",
      component: (
        <SelectPlan />
      )
    },
    {
      id: 'add',
      title: "Pick add-ons",
      desc: "Add-ons help enhance your gaming experience.",
      component: (
        <AddOns />
      )
    },
    {
      id: 'summary',
      title: "Finishing up",
      desc: "Double-check everything looks OK before confirming.",
      component: (
        <Summary />
      )
    },
  ]

  return (
    <main id="main card" className="absolute bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[15px] md:w-172 lg:w-235 md:h-150 md:bg-white md:shadow-[0px_25px_40px_-20px_rgb(0,0,0_10)]">
      <nav id="nav">

      </nav>
      <section id="step-container">

      </section>
    </main>
  );
}
