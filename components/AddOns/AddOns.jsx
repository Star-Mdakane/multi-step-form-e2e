import { useFormContext } from "react-hook-form"
import { FaCheck } from "react-icons/fa"

const AddOns = ({ billing, prices, addons = {}, added }) => {

    const { register, formState: { errors } } = useFormContext()

    return (
        <div
            className="px-6 md:px-0 flex flex-col gap-2 md:gap-4"
        >
            {added?.map(a => (
                <label
                    key={a.key}
                    className="w-full py-3 px-4 md:px-6 md:py-4.5 flex items-center justify-between h-15.5 md:h-20 rounded-lg has-checked:bg-input-pri border border-input-pri has-checked:border-input-focus hover:border-input-focus"
                >
                    <div className="h-full flex items-center gap-4 md:gap-6">
                        <div
                            className="relative flex items-center justify-center w-5 h-5">
                            <input type="checkbox"
                                {...register(`addons.${a.key}`)}
                                defaultChecked={addons[a.key]}
                                className="peer w-full h-full  rounded-sm appearance-none border-2 border-input-pri checked:bg-input-focus checked:border-input-focus" />
                            <FaCheck className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none" />
                        </div>
                        <div className="h-full flex flex-col justify-between">
                            <p
                                className="text-[14px] md:text-[16px] text-pri leading-[150%] md:leading-[120%] tracking-normal font-medium first-letter:capitalize"
                            >
                                {a.name}
                            </p>
                            <p
                                className="text-[12px] md:text-[14px] text-text-pri leading-[120%] tracking-normal font-normal first-letter:capitalize">
                                {a.desc}
                            </p>
                        </div>
                    </div>
                    <p
                        className="text-[12px] text-text-pri leading-[120%] tracking-normal font-normal"
                    >
                        ${prices[a.key]?.[billing]}/{billing === "monthly" ? 'mo' : 'yr'}
                    </p>
                </label>
            ))}
        </div>
    )
}

export default AddOns