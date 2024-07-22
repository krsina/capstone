import React from 'react'

function ClubRenewal() {
    return (
        <div className="bg-gray-300 py-24 items-center justify-center flex flex-row ml-80">
            <div className="items-center w-4/5 justify-center bg-white py-12 px-12 rounded-lg">
                <div className="bg-primary p-4 rounded-lg flex  items-center justify-center">
                    <h1 className="text-5xl font-encode-sans font-bold text-white px-6 py-4">Club Renewal</h1>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-12 text-secondary font-open-sans text-lg">
                    <div>
                        <h2 className="text-2xl font-medium">Basic Information</h2>
                        <div className="grid grid-cols-2 gap-20 mt-4">
                            <input type="text" placeholder="Club Name" className="border-r border-b border-gray-300 p-2 rounded " />
                            <input type="text" placeholder="Club Category" className="border-r border-b border-gray-300 p-2 rounded " />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">Affiliation</h2>
                        <div className="grid grid-cols-3 gap-20 mt-4">
                            <input type="text" placeholder="Is your club affiliated?" className="border-r border-b border-gray-300 p-2 rounded " />
                            <input type="text" placeholder="Name of umbrella Organizations" className="border-r border-b border-gray-300 p-2 rounded " />
                            <input type="text" placeholder="Name of outside Organizations" className="border-r border-b border-gray-300 p-2 rounded " />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">Club Description</h2>
                        <textarea placeholder="Enter Description here" className="w-full h-24 border-r border-b border-gray-300 p-2 rounded "></textarea>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">Mission</h2>
                        <textarea placeholder="Enter Description here" className="w-full h-16 border-r border-b border-gray-300 p-2 rounded "></textarea>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">Vision</h2>
                        <textarea placeholder="Enter Description here" className="w-full h-16 border-r border-b border-gray-300 p-2 rounded "></textarea>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">Purpose</h2>
                        <textarea placeholder="Enter Description here" className="w-full h-16 border-r border-b border-gray-300 p-2 rounded "></textarea>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">Meeting Information</h2>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <input type="text" placeholder="Meeting Times" className="border-r border-b border-gray-300 p-2 rounded " />
                            <input type="text" placeholder="Meeting Days" className="border-r border-b border-gray-300 p-2 rounded " />
                            <input type="text" placeholder="Location" className="border-r border-b border-gray-300 p-2 rounded " />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">Uploads</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <input type="file" className="border-r border-b border-gray-300 p-2 rounded " />
                            <input type="file" className="border-r border-b border-gray-300 p-2 rounded " />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ClubRenewal