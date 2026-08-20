import { useFormContext } from "react-hook-form"

const NavBar = ({ step, setStep, completedSteps, setCompletedSteps }) => {

    const { trigger } = useFormContext()


    const navSteps = [
        {
            id: 1,
            navStep: 'step 1',
            navTitle: 'Your info',
            fields: ['name', 'email', 'phone']
        },
        {
            id: 2,
            navStep: 'step 2',
            navTitle: 'Select plan',
            fields: ['plan']
        },
        {
            id: 3,
            navStep: 'step 3',
            navTitle: 'Add-ons',
            fields: []
        },
        {
            id: 4,
            navStep: 'step 4',
            navTitle: 'Summary',
            fields: []
        }
    ]

    const isFullyUnlocked = completedSteps.includes(1)

    const handleNavClick = async (targetIdx) => {
        if (targetIdx === step) return

        if (isFullyUnlocked || targetIdx < step || completedSteps.includes(targetIdx)) {
            setStep(targetIdx)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        if (targetIdx === step + 1) {
            const currentFields = navSteps[step].fields
            const isValid = currentFields.length === 0 ? true : await trigger(currentFields, { shouldFocus: true })

            if (isValid) {
                setStep(targetIdx)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

    return (
        <ul
            className="flex md:flex-col md:h-full rounded-[15px] md:bg-[url('../public/images/bg-sidebar-desktop.svg')] bg-no-repeat bg-cover bg-center md:px-6 md:py-10 md:space-y-8 gap-x-4 md:gap-x-0"
        >
            {navSteps.map((s, idx) => {
                const isNextStep = idx === step + 1
                const canClick = idx <= step || isNextStep
                return (
                    <button
                        onClick={() => handleNavClick(idx)}
                        key={idx}
                        disabled={!canClick}
                        className="flex gap-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                        type="button"
                        aria-label={`go to ${s.navTitle} page`}
                    >
                        <div className={`w-8 h-8 text-[14px] font-bold leading-[120%] tracking-[1px] grid place-content-center border border-white rounded-full ${step === idx ? 'bg-nav-bg' : ''} ${step === idx ? 'text-pri' : 'text-white'} transition-colors duration-300`}>
                            {s.id}
                        </div>
                        <div
                            className="hidden md:block text-left"
                        >
                            <p
                                className="text-[12px] text-white font-normal leading-[120%] tracking-normal uppercase"
                            >{s.navStep}</p>
                            <p
                                className="text-[14px] text-white font-bold leading-[120%] tracking-[1px] uppercase"
                            >{s.navTitle}</p>
                        </div>
                    </button>
                )
            })}

        </ul>
    )
}

export default NavBar