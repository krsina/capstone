import React, { useState } from 'react'
import FieldCounter from '../../common/FieldCounter';

function ClubRegistration() {




    return (
        <div className="bg-gray-300 py-24 flex flex-row items-center justify-center ml-80">
            <div className="w-4/5 bg-white py-12 px-12 rounded-lg">
                <div className="bg-primary p-4 rounded-lg flex  items-center justify-center">
                    <h1 className="text-5xl font-encode-sans font-bold text-white px-6 py-4">Club Registration</h1>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-8 text-secondary font-open-sans text-lg">
                    <h2 className="text-2xl font-medium">Basic Information</h2>
                    <div className="grid grid-cols-2 gap-20 mt-4">
                        <input type="text" placeholder="Club Name" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Club Category" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    <h2 className="text-2xl font-medium">Affiliation</h2>
                    <div className="grid grid-cols-3 gap-20 mt-4">
                        <input type="text" placeholder="Is your club affiliated?" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Name of umbrella Organizations" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Name of outside Organizations" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    {/* Club Description */}
                    <h2 className="text-2xl font-medium">Club Description</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    {/* Club Mission */}
                    <h2 className="text-2xl font-medium">Mission</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    {/* Club Vision */}
                    <h2 className="text-2xl font-medium">Vision</h2>
                    <textarea placeholder="Enter Description here" className="w-full h-16 border-r border-b border-gray-300 p-2 rounded"></textarea>

                    <h2 className="text-2xl font-medium">Purpose</h2>
                    <textarea placeholder="Enter Description here" className="w-full h-16 border-r border-b border-gray-300 p-2 rounded"></textarea>

                    <h2 className="text-2xl font-medium">Meeting Information</h2>
                    <div className="grid grid-cols-3 gap-12 mt-4">
                        <input type="text" placeholder="Meeting Times" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Meeting Days" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Location" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    <h2 className="text-2xl font-medium">Uploads</h2>
                    <div className="grid grid-cols-2 gap-12 mt-4">
                        <input type="file" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="file" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    <h2 className="text-2xl font-medium">Advisor</h2>
                    <div className="grid grid-cols-3 gap-12 mt-4">
                        <input type="text" placeholder="First Name" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Last Name" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Advisor Email" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>
                    <button

                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ClubRegistration
