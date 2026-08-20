'use client'

import { useFormContext, useWatch } from "react-hook-form"

const PersonalInfo = () => {

    const { register, formState: { errors }, control } = useFormContext()
    useWatch({ control, name: ["name", "email", "phone"] })

    return (
        <div
            className="space-y-6 px-6 md:px-0">
            <label className="flex flex-col gap-2">
                <div className="text-[14px] leading-[120%] tracking-normal font-normal flex justify-between">
                    <p className="text-pri">Name</p>
                    {errors.name && <p className="text-error">{errors.name.message}</p>}
                </div>
                <input
                    className={`px-4 py-2 rounded-sm placeholder:text-placeholder border transition-colors duration-200 ${errors.name ? 'border-error' : 'border-input-pri'} focus:outline-none focus:border-input-focus`}
                    {...register('name', {
                        required: "Name is required",
                    })}
                />
            </label>
            <label className="flex flex-col gap-2">
                <div className="text-[14px] leading-[120%] tracking-normal font-normal flex justify-between">
                    <p className="text-pri">Email Address</p>
                    {errors.email && <p className="text-error">{errors.email.message}</p>}
                </div>
                <input
                    className={`px-4 py-2 rounded-sm placeholder:text-placeholder border transition-colors duration-200 ${errors.email ? 'border-error' : 'border-input-pri'} focus:outline-none focus:border-input-focus`}
                    {...register('email', {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                        },
                    })}
                />
            </label>
            <label className="flex flex-col gap-2">
                <div className="text-[14px] leading-[120%] tracking-normal font-normal flex justify-between">
                    <p className="text-pri">Phone Number</p>
                    {errors.phone && <p className="text-error">{errors.phone.message}</p>}
                </div>
                <input
                    className={`px-4 py-2 rounded-sm placeholder:text-placeholder border transition-colors duration-200 ${errors.phone ? 'border-error' : 'border-input-pri'} focus:outline-none focus:border-input-focus`}
                    {...register('phone', {
                        required: "Phone Number is required",
                        pattern: {
                            value: /^\+\d+$/,
                            message: "Phone number must start with +",
                        },
                    })}
                />
            </label>
        </div>
    )
}

export default PersonalInfo