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
  pro: { monthly: 15, yearly: 150 },
  onlineService: { monthly: 1, yearly: 10 },
  largerStorage: { monthly: 2, yearly: 20 },
  customizableProfile: { monthly: 2, yearly: 20 }
}

export default function Home() {

  const [step, setStep] = useState(0);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      billing: "monthly",
      plan: "",
      addons: {}
    }
  });

  const { control, reset, getValues } = methods;

  //For ui and calculation
  const data = useWatch({
    control,
  })

  const billing = useWatch({
    control,
    name: "billing"
  })

  const plan = useWatch({
    control,
    name: "plan",
  })

  const addons = useWatch({
    control,
    name: "addons",
  })

  //Calculations
  const planPrice = plan ? PRICES[plan][billing] : 0;
  const addonsPrice = Object.keys(addons)
    .filter(k => addons[k])
    .reduce((sum, k) => sum + PRICES[k][billing], 0);
  const total = planPrice + addonsPrice;

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

    const currentData = getValues();

    localStorage.setItem("multi-step", JSON.stringify(currentData));
  }, [billing, plan, addons, getValues, loaded, data]);

  const added = [
    {
      key: "onlineService",
      name: "Online service",
      desc: "Access to multiplayer games"
    },
    {
      key: "largerStorage",
      name: "Larger storage",
      desc: "Extra 1TB of cloud save"
    },
    {
      key: "customizableProfile",
      name: "Customizable profile",
      desc: "Custom theme on your profile"
    },
  ]

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
        <SelectPlan billing={billing} prices={PRICES} plan={plan} />
      )
    },
    {
      id: 'add',
      title: "Pick add-ons",
      desc: "Add-ons help enhance your gaming experience.",
      component: (
        <AddOns billing={billing} prices={PRICES} addons={addons} added={added} />
      )
    },
    {
      id: 'summary',
      title: "Finishing up",
      desc: "Double-check everything looks OK before confirming.",
      component: (
        <Summary setStep={setStep} billing={billing} prices={PRICES} plan={plan} planPrice={planPrice} addonsPrice={addonsPrice} addons={addons} total={total} added={added} />
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
          className="w-86 md:w-md lg:w-158.5 mx-auto h-auto bg-white shadow-main md:shadow-none rounded-[10px] py-8 md:p-0 flex justify-center items-center">
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
