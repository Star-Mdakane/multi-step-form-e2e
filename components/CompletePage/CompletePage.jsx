import Image from "next/image"

const CompletePage = () => {
    return (
        <div
            className="h-100 md:h-150 w-74 md:w-79 lg:w-md flex flex-col justify-center items-center  gap-6 md:gap-8">
            <div
                className="relative rounded-full overflow-hidden w-14 h-14 md:w-20 md:h-20">
                <Image
                    src="/images/icon-thank-you.svg"
                    alt="thank you"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="space-y-2 md:space-y-4 text-center">
                <p
                    className="text-[24px] md:text-[32px] text-pri leading-5 tracking-normal font-bold first-letter:capitalize">
                    Thank you!
                </p>
                <p
                    className="text-[16px] text-text-pri leading-[150%] tracking-normal font-normal">
                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                </p>
            </div>
        </div>
    )
}

export default CompletePage