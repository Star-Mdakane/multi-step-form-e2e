'use client'

import AddOns from "@/components/AddOns/AddOns";
import ButtonContainer from "@/components/ButtonContainer/ButtonContainer";
import NavBar from "@/components/NavBar/NavBar";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import SelectPlan from "@/components/SelectPlan/SelectPlan";
import StepContainer from "@/components/StepContainer/StepContainer";
import Summary from "@/components/Summary/Summary";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

const PRICES = {
  arcade: { monthly: 9, yearly: 90 },
  advanced: { monthly: 12, yearly: 120 },
  pro: { monthly: 15, yearly: 150 }
}

export default function Home() {

  const [step, setStep] = useState(0);

  const methods = useForm({
    mode: "onBlur",
  });

  const { control, reset } = methods;

  const data = useWatch({
    control,
  })

  const billing = useWatch({
    control,
    name: "billing",
    defaultValue: "monthly"
  })

  const plan = useWatch({
    control,
    name: "plan",
  })

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("multi-step");

    if (saved) {
      reset(JSON.parse(saved));
    }
    setLoaded(true);
  }, [reset]);

  useEffect(() => {
    if (!loaded) return;
    console.log("data changed:", data);

    localStorage.setItem("multi-step", JSON.stringify(data));
  }, [data, loaded]);

  const steps = [
    {
      id: 'personal',
      title: "Personal info",
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
        <SelectPlan billing={billing} prices={PRICES} />
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
    <FormProvider {...methods}>
      <main id="main card" className="min-w-93.75 absolute pt-8 md:pt-0 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[15px] w-93.75 h-full md:w-172 lg:w-235 md:h-150 md:bg-white md:shadow-main flex flex-col space-y-8 md:space-y-0 md:flex-row">
        <nav id="nav"
          className="w-45 md:w-59.5 lg:w-76.5 mx-auto md:p-4"
        >
          <NavBar step={step} setStep={setStep} />
        </nav>
        <section id="step-container"
          className="w-86 md:w-md lg:w-158.5 mx-auto bg-white shadow-main md:shadow-none rounded-[10px] py-8 md:p-0 flex justify-center items-center">
          <StepContainer step={step} steps={steps} setStep={setStep} />
        </section>
        <footer
          className="absolute w-93.75 min-w-93.75 bottom-0 left-0 flex md:hidden"
        >
          <ButtonContainer step={step} setStep={setStep} />
        </footer>
      </main>
    </FormProvider>
  );
}
