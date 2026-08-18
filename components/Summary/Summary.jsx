import { ADDONS, PRICES } from "@/lib/plans";

const Summary = ({ billing, plan, addons = {}, total, setStep }) => {

    const addonsKeys = Object.keys(addons || {}).filter(k => addons?.[k])
    const planPrice = PRICES[plan]?.[billing] ?? 0

    const selectedAddons = addonsKeys.map(key => {
        const addonInfo = ADDONS.find(a => a.key === key)
        if (!addonInfo) return null
        return {
            ...addonInfo,
            price: PRICES[key]?.[billing] ?? 0
        }
    }).filter(Boolean)

    return (
        <div className="flex flex-col px-6 md:px-0 gap-6 md:gap-8">
            <div className="flex flex-col gap-4 p-4 rounded-lg bg-radio">
                <div id="plan"
                    className="flex justify-between items-center">
                    <div className=""
                    >
                        <p className="text-[14px] md:text-[16px] text-pri leading-[150%] md:leading-[120%] tracking-normal font-medium capitalize"
                        >{plan || "Select plan"} ({billing})</p>
                        <button
                            type="button"
                            onClick={() => setStep(() => 1)}
                            className="text-[12px] md:text-[14px] text-text-pri leading-[120%] tracking-normal font-normal first-letter:capitalize">
                            Change
                        </button>
                    </div>
                    <p className="text-[14px] md:text-[16px] text-pri leading-[150%] md:leading-[120%] tracking-normal font-medium first-letter:capitalize">
                        ${planPrice}/{billing === "monthly" ? 'mo' : 'yr'}
                    </p>
                </div>
                {selectedAddons.length > 0 && <div id="hr"
                    className="h-px bg-input-pri w-full">
                </div>}
                <div id="addons"
                    className="flex flex-col gap-4">
                    {
                        selectedAddons.map(s => (
                            <div key={s.key}
                                className="flex justify-between items-center">
                                <p
                                    className="text-[12px] md:text-[14px] text-text-pri leading-[120%] tracking-normal font-normal first-letter:capitalize">
                                    {s.name}
                                </p>
                                <p
                                    className="text-[12px] md:text-[14px] text-pri leading-[120%] tracking-normal font-normal first-letter:capitalize">
                                    +${s.price}/{billing === "monthly" ? 'mo' : 'yr'}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div id="total"
                className="mx-4 flex justify-between">
                <p
                    className="text-[12px] md:text-[14px] text-text-pri leading-[120%] tracking-normal font-normal first-letter:capitalize">
                    Total (per month)
                </p>
                <p
                    className="text-[16px] md:text-[20px] text-pri leading-5 tracking-normal font-bold first-letter:capitalize">
                    +${total}/{billing === "monthly" ? 'mo' : 'yr'}
                </p>
            </div>
        </div>
    )
}

export default Summary