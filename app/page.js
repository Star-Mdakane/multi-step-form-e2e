'use client'

import AddOns from "@/components/AddOns/AddOns";
import ButtonContainer from "@/components/ButtonContainer/ButtonContainer";
import CompletePage from "@/components/CompletePage/CompletePage";
import NavBar from "@/components/NavBar/NavBar";
import PersonalInfo from "@/components/PersonalInfo/PersonalInfo";
import SelectPlan from "@/components/SelectPlan/SelectPlan";
import StepContainer from "@/components/StepContainer/StepContainer";
import Summary from "@/components/Summary/Summary";
import { useEffect, useState, useRef } from "react";
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
  const [isMounted, setIsMounted] = useState(false)
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([])
  const [completed, setCompleted] = useState(false)
  const timeoutRef = useRef(null)

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      billing: "monthly",
      plan: "",
      addons: {}
    }
  });

  const { control, reset, getValues, watch } = methods;

  const onSubmit = (data) => {
    console.log(data);
    localStorage.removeItem('multi-step')
    setCompleted(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      reset({
        name: "",
        email: "",
        phone: "",
        billing: "monthly",
        plan: "",
        addons: {}
      })
      setStep(0)
      setCompletedSteps([])
      setCompleted(false)
    }, 5000)

  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

  }, [])

  //For ui and calculation

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
  const planPrice = PRICES[plan]?.[billing] ?? 0;
  const addonsPrice = Object.keys(addons || {})
    .filter(k => addons[k])
    .reduce((sum, k) => sum + PRICES[k][billing], 0);
  const total = planPrice + addonsPrice;

  useEffect(() => {
    const saved = localStorage.getItem('multi-step')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        reset(parsed)
      } catch { }
    }
    setIsMounted(true)
  }, [reset]);


  useEffect(() => {
    if (!isMounted) return;
    // console.log("data changed:", data);
    const subscription = watch((value) => {
      localStorage.setItem('multi-step', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch, isMounted]);


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
        <AddOns billing={billing} prices={PRICES} addons={addons} />
      )
    },
    {
      id: 'summary',
      title: "Finishing up",
      desc: "Double-check everything looks OK before confirming.",
      component: (
        <Summary setStep={setStep} billing={billing} prices={PRICES} plan={plan} planPrice={planPrice} addonsPrice={addonsPrice} addons={addons} total={total} />
      )
    },
  ]


  return (
    <FormProvider {...methods}>
      <main id="main card" className="min-w-93.75 absolute pt-8 md:pt-0 bg-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[15px] w-93.75 h-full md:w-172 lg:w-235 md:h-150 md:bg-white md:shadow-main flex flex-col space-y-8 md:space-y-0 md:flex-row">
        <nav id="nav"
          className="w-45 md:w-59.5 lg:w-76.5 mx-auto md:p-4"
        >
          <NavBar step={step} setStep={setStep} trigger={methods.trigger} completedSteps={completedSteps} setCompletedSteps={setCompletedSteps} />
        </nav>
        <section id="step-container"
          className="w-86 md:w-md lg:w-158.5 mx-auto h-auto bg-white shadow-main md:shadow-none rounded-[10px] py-8 md:p-0 flex justify-center items-center">
          {completed ?
            <CompletePage />
            :
            <StepContainer step={step} steps={steps} setStep={setStep} setCompleted={setCompleted} completed={completed} completedSteps={completedSteps} setCompletedSteps={setCompletedSteps} onSubmit={onSubmit} />
          }
        </section>
        <footer
          className="absolute w-93.75 min-w-93.75 bottom-0 left-0 flex md:hidden"
        >
          {!completed && <ButtonContainer testId="mobile-buttons" step={step} setStep={setStep} setCompleted={setCompleted} completedSteps={completedSteps} setCompletedSteps={setCompletedSteps} onSubmit={onSubmit} />}
        </footer>
      </main>
    </FormProvider>
  );
}
