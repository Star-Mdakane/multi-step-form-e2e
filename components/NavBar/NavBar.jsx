const NavBar = ({ step, setStep }) => {

    const navSteps = [
        {
            id: 1,
            navStep: 'step 1',
            navTitle: 'Your info'
        },
        {
            id: 2,
            navStep: 'step 2',
            navTitle: 'Select plan'
        },
        {
            id: 3,
            navStep: 'step 3',
            navTitle: 'Add-ons'
        },
        {
            id: 4,
            navStep: 'step 4',
            navTitle: 'Summary'
        }
    ]


    return (
        <ul
            className="flex md:flex-col md:h-full rounded-[15px] md:bg-[url('../public/images/bg-sidebar-desktop.svg')] bg-no-repeat bg-cover bg-center px-6 py-10 md:space-y-8 gap-x-4 md:gap-x-0"
        >
            {navSteps.map((s, idx) => (
                <button
                    onClick={() => setStep(prev => prev = idx)}
                    key={idx}
                    className="flex gap-4 cursor-pointer"
                    type="button"
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