import ButtonContainer from "../ButtonContainer/ButtonContainer";

const StepContainer = ({ step, steps, setStep }) => {

    const page = steps[step]?.component;

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="md:w-86 lg:w-112.5 h-93.75 md:min-h-128 lg:min-h-126 flex flex-col justify-between"

        >
            <div>
                <div className="px-6">
                    <h1
                        className="mb-2 text-[24px] md:text-[32px] text-pri leading-[120%] tracking-normal font-bold">
                        {steps[step].title}
                    </h1>
                    <p
                        className="mb-6 md:mb-8 text-[16px] text-text-pri leading-[150%] tracking-normal font-normal">
                        {steps[step].desc}
                    </p>
                </div>

                {page}
            </div>
            <div className="hidden md:block">
                <ButtonContainer step={step} setStep={setStep} />
            </div>
        </div>
    )
}

export default StepContainer