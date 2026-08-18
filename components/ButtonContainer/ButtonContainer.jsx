'use client'

import { useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const ButtonContainer = ({ step, setStep, setCompleted }) => {

    const { trigger, handleSubmit, reset } = useFormContext();
    const timeOutRef = useRef(null)

    useEffect(() => {
        return () => clearTimeout(timeOutRef.current)
    }, [])

    const onSubmit = async (data) => {
        console.log(data);
        const isValid = await trigger()
        if (!isValid) return;

        reset({
            name: "",
            email: "",
            phone: "",
            billing: "monthly",
            plan: "",
            addons: {}
        })
        setCompleted(true)
        setStep(0)
        localStorage.removeItem('multi-step')

        timeOutRef.current = setTimeout(() => {
            setCompleted(false)
        }, 5000)
    };



    const nextStep = async () => {
        if (step === 3) {
            handleSubmit(onSubmit)();
            return;
        }

        const valid = await trigger()

        if (valid) {
            setStep(prev => Math.min(prev + 1, 3))
        }
    }

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 0))
    }

    return (
        <div
            className="w-full flex justify-between text-[14px] md:text-[16px] leading-[150%] md:leading-[120%] tracking-normal font-medium p-4 md:p-0 bg-white"
        >
            <button type="button"
                aria-label="previous page"
                onClick={prevStep}
                className={`w-24 md:w-31 h-10 md:h-12 cursor-pointer text-text-pri hover:text-pri rounded-sm md:rounded-lg transition-colors duration-300`}
            >
                {step === 0 ? '' : 'Go Back'}

            </button>
            <button type="button"
                aria-label="next page"
                onClick={nextStep}
                className="w-24 md:w-31 h-10 md:h-12 cursor-pointer text-[14px] md:text-[16px] leading-[150%] md:leading-[120%] tracking-normal font-medium bg-pri hover:bg-pri-hover text-white rounded-sm md:rounded-lg transition-colors duration-300"
            >
                {step === 3 ? 'Confirm' : 'Next Step'}
            </button>
        </div>
    )
}

export default ButtonContainer