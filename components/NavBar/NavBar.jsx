import { useFormContext } from "react-hook-form"

const NavBar = ({ step, setStep }) => {

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

    const handleNavClick = async (targetIdx) => {
        if (targetIdx > step) {
            const currentFields = navSteps[step].fields
            const isValid = await trigger(currentFields)
            if (!isValid) return
        }
        setStep(targetIdx)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <ul
            className="flex md:flex-col md:h-full rounded-[15px] md:bg-[url('../public/images/bg-sidebar-desktop.svg')] bg-no-repeat bg-cover bg-center md:px-6 md:py-10 md:space-y-8 gap-x-4 md:gap-x-0"
        >
            {navSteps.map((s, idx) => (
                <button
                    onClick={() => handleNavClick(idx)}
                    key={idx}
                    className="flex gap-4 cursor-pointer"
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
            ))}

        </ul>
    )
}

export default NavBar