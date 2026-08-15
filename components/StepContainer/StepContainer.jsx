const StepContainer = ({ step, steps, setStep }) => {

    const page = steps[step]?.component;

    return (
        <div
            className="md:w-87 lg:w-112.5"
        >
            {page}
        </div>
    )
}

export default StepContainer