import React from 'react'

function Event() {
    return (
        <div className="sm:ml-80 py-20 md:px-28 px-6 flex flex-col gap-y-12 text-secondary">
            <div className="md:text-4xl text-3xl font-encode-sans font-semibold">
                <h1>Recent Post</h1>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <img className="w-10 h-10 rounded-full bg-gray-800" src="" alt="Rounded avatar"></img>
                        <h1 className="font-encode-sans text-2xl font-semibold">Club Name Holder</h1>
                    </div>
                    <div className="relative rounded lg:w-[34rem] lg:h-[26rem] bg-gray-400 items-center justify-center flex">
                        <h1> This is a placeholder for image</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="font-encode-sans text-xl font-semibold">Event Title</h1>
                        <p className="lg:w-[34rem] text-xs md:text-base">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan eros diam, vel elementum dui dapibus posuere. Ut porttitor pharetra ipsum,
                            imperdiet imperdiet nisl vehicula in. Sed a nibh nec mi rhoncus hendrerit. Proin ipsum mi, blandit eget urna vestibulum,
                            faucibus fringilla lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus.Proin ipsum mi, blandit eget urna vestibulum,
                            faucibus fringilla lectus.
                        </p>
                        <div className="flex flex-row justify-between  gap-4 mx-auto">
                            <p className="text-xs md:text-base">Date: 12/12/2021</p>
                            <p className="text-xs md:text-base">Time: 12:00 PM</p>
                            <p className="text-xs md:text-base">Location: Disc 127</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Event