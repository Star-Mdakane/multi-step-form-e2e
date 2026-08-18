import Image from "next/image"
import { useFormContext } from "react-hook-form"

const SelectPlan = ({ billing, prices, plan }) => {
    const { register, setValue, formState: { errors } } = useFormContext()

    const toggleBilling = () => {
        setValue(
            "billing",
            billing === "monthly" ? "yearly" : "monthly",
            { shouldValidate: true }
        )
    }

    const plans = [
        { key: "arcade", name: "Arcade" },
        { key: "advanced", name: "Advanced" },
        { key: "pro", name: "Pro" },
    ]

    return (

        <div className="space-y-6 lg:space-y-8 px-6 md:px-0 bg-white rounded-lg">
            <div
                className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-0 lg:justify-between"
            >
                {
                    plans.map(p => (
                        <label
                            key={p.key}
                            className="w-full h-20 lg:h-40 lg:w-34.5 flex px-6 lg:p-4 rounded-lg has-checked:bg-input-pri border border-input-pri has-checked:border-input-focus hover:border-input-focus"
                        >
                            <input type="radio"
                                value={p.key}
                                {...register('plan', { required: "Please select a plan" })}
                                defaultChecked={plan === p.key}
                                className="sr-only" />
                            <div
                                className="w-full flex lg:flex-col justify-between items-center lg:items-start"
                            >
                                <div className="flex gap-4 lg:flex-col justify-between" >
                                    <Image
                                        src={`/images/icon-${p.key}.svg`}
                                        width={40}
                                        height={40}
                                        alt={`${p.name} plan icon`} />
                                    <span>
                                        <p
                                            className="text-[16px] text-pri leading-[120%] tracking-normal font-medium first-letter:uppercase"
                                        >{p.name}</p>
                                        <p
                                            className="text-[14px] text-text-pri leading-[120%] tracking-normal font-normal"
                                        >${prices[p.key]?.[billing] ?? 0}/{billing === "monthly" ? 'mo' : 'yr'}</p>
                                    </span>
                                </div>
                                <p
                                    className="text-[12px] text-pri leading-[120%] tracking-normal font-normal">
                                    {billing === "yearly" ? '2 Months free' : ''}
                                </p>
                            </div>
                        </label>
                    ))
                }
            </div>
            {errors.plan && <p className="text-red-500 text-sm">{errors.plan.message}</p>}
            <div
                className="w-73.75 md:w-full h-12 flex justify-center items-center gap-6 bg-radio rounded-lg">
                <p
                    className="text-[14px] text-text-pri leading-[150%] tracking-normal font-medium">
                    Monthly
                </p>
                <button
                    type="button"
                    onClick={toggleBilling}
                    aria-label={`Billing frequency: ${billing}`}
                    className="w-9.5 h-5 p-1 bg-pri rounded-[10px] flex justify-between items-center cursor-pointer">
                    <span
                        className={`h-3 w-3 rounded-full ${billing === "monthly" ? 'bg-white' : ''} transition duration-300`}
                    >
                    </span>
                    <span
                        className={`h-3 w-3 rounded-full ${billing === "yearly" ? 'bg-white' : ''} transition duration-300 `}
                    >
                    </span>
                </button>
                <p
                    className="text-[14px] text-text-pri leading-[150%] tracking-normal font-medium">
                    Yearly
                </p>
            </div>
        </div>

    )
}

export default SelectPlan