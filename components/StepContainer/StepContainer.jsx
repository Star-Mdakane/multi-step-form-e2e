const StepContainer = ({ step, steps, setStep }) => {

    const page = steps[step]?.component;

    return (
        <div
            className=""
        >
            {page}
        </div>
    )
}

export default StepContainer