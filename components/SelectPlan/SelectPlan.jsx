import Image from "next/image"
import { useFormContext } from "react-hook-form"

const SelectPlan = ({ billing, prices }) => {
    const { register, setValue, formState: { errors } } = useFormContext()

    const toggleBilling = () => {
        setValue(
            "billing",
            billing === "monthly" ? "yearly" : "monthly",
            { shouldValidate: true }
        )
    }

    return (


        <div
            className="flex flex-col gap-6"
        >
            {
                ["arcade", "advanced", "pro"].map(p => (
                    <label
                        key={p}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-0 lg:justify-between px-6"
                    >
                        <input type="radio" value={p} {...register('plan')} className="sr-only" />
                        <div
                            className="w-full h-20 md:h-40 flex md:flex-col justify-between items-center"
                        >
                            <div className="flex gap-4" >
                                <Image
                                    src={`/images/icon-${p}.svg`}
                                    width={40}
                                    height={40}
                                    alt="plan immage" />
                                <span>
                                    <p
                                        className="text-[16px] text-pri leading-[120%] tracking-normal font-medium first-letter:uppercase"
                                    >{p}</p>
                                    <p
                                        className="text-[14px] text-text-pri leading-[120%] tracking-normal font-normal"
                                    >${prices[p][billing]}/{billing === "monthly" ? 'mo' : 'yr'}</p>
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
            {/* <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-0 lg:justify-between"
            >
                <div
                    className="w-full h-20 md:h-40 flex md:flex-col justify-between items-center"
                >
                    <div className="flex gap-4" >
                        <Image
                            src={'/images/icon-arcade.svg'}
                            width={40}
                            height={40}
                            alt="plan immage" />
                        <span>
                            <p
                                className="text-[16px] text-pri leading-[120%] tracking-normal font-medium"
                            >Arcade</p>
                            <p
                                className="text-[14px] text-text-pri leading-[120%] tracking-normal font-normal"
                            >$9/mo</p>
                        </span>
                    </div>
                    <p
                        className="text-[12px] text-pri leading-[120%] tracking-normal font-normal">
                        2 months free
                    </p>
                </div>
            </div> */}
            <div
                className="h-12 w-86 flex justify-center items-center gap-6 bg-radio rounded-lg">
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