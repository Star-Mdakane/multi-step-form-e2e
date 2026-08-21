'use client'

import { useFormContext } from "react-hook-form"

const PersonalInfo = () => {

    const { register, formState: { errors } } = useFormContext()

    return (
        <div
            className="space-y-6 px-6 md:px-0">
            <label htmlFor="name" className="flex flex-col gap-2">
                <div className="text-[14px] leading-[120%] tracking-normal font-normal flex justify-between">
                    <span className="text-pri">Name</span>
                    {errors.name && <span id="name-error" role="alert" className="text-error">{errors.name.message}</span>}
                </div>
                <input
                    id="name"
                    className={`px-4 py-2 rounded-sm placeholder:text-text-pri border transition-colors duration-200 ${errors.name ? 'border-error' : 'border-input-pri'} focus:outline-none focus:border-input-focus hover:cursor-pointer`}
                    {...register('name', {
                        required: "Name is required",
                    })}
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    placeholder="e.g. Stephen King"
                />
            </label>
            <label htmlFor="email" className="flex flex-col gap-2">
                <div className="text-[14px] leading-[120%] tracking-normal font-normal flex justify-between">
                    <span className="text-pri">Email Address</span>
                    {errors.email && <span id="email-error" role="alert" className="text-error">{errors.email.message}</span>}
                </div>
                <input id="email"
                    className={`px-4 py-2 rounded-sm placeholder:text-text-pri border transition-colors duration-200 ${errors.email ? 'border-error' : 'border-input-pri'} focus:outline-none focus:border-input-focus hover:cursor-pointer`}
                    {...register('email', {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                        },
                    })}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    placeholder="e.g. stephenking@lorem.com"
                />
            </label>
            <label htmlFor="phone" className="flex flex-col gap-2">
                <div className="text-[14px] leading-[120%] tracking-normal font-normal flex justify-between">
                    <span className="text-pri">Phone Number</span>
                    {errors.phone && <span id="phone-error" role="alert" className="text-error">{errors.phone.message}</span>}
                </div>
                <input id="phone"
                    className={`px-4 py-2 rounded-sm placeholder:text-text-pri border transition-colors duration-200 ${errors.phone ? 'border-error' : 'border-input-pri'} focus:outline-none focus:border-input-focus hover:cursor-pointer`}
                    {...register('phone', {
                        required: "Phone Number is required",
                        pattern: {
                            value: /^\+\d+$/,
                            message: "Phone number must start with +",
                        },
                    })}
                    aria-invalid={!!errors.phone}
                    aria-describedby="phone-error"
                    placeholder="e.g. +1 234 567 890"
                />
            </label>
        </div>
    )
}

export default PersonalInfo