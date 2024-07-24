import React from 'react'
import FieldCounter from '../../common/FieldCounter';
import BackButton from '../../common/BackButton';

function ClubRegistration() {

    return (
        <div className="bg-gray-300 py-20 flex flex-row items-center justify-center ml-80">
            <BackButton />
            <div className="w-5/6 bg-white py-20 px-24 rounded-lg">
                <div className="bg-primary p-4 rounded-lg flex  items-center justify-center">
                    <h1 className="text-6xl font-encode-sans font-bold text-white px-6 py-4">Club Registration</h1>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-8 text-secondary font-open-sans text-lg">
                    <h2 className="text-3xl font-bold">Basic Information</h2>
                    <div className="grid grid-cols-2 gap-20 mt-4">
                        <input type="text" placeholder="Club Name" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Club Category" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    <h2 className="text-3xl font-bold">Affiliation</h2>
                    <div className="grid grid-cols-3 gap-10 mt-4">
                        <input type="text" placeholder="Is your club affiliated?" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Name of umbrella Organizations" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Name of outside Organizations" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    {/* Club Description */}
                    <h2 className="text-3xl font-bold">Club Description</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    {/* Club Mission */}
                    <h2 className="text-3xl font-bold">Mission</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    {/* Club Vision */}
                    <h2 className="text-3xl font-bold">Vision</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    {/* Club Purpose */}
                    <h2 className="text-3xl font-bold">Purpose</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    <h2 className="text-3xl font-bold">Meeting Information</h2>
                    <div className="grid grid-cols-3 gap-10 mt-4">
                        <input type="text" placeholder="Meeting Times" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Meeting Days" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="text" placeholder="Location" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    <h2 className="text-3xl font-bold">Uploads</h2>
                    <div className="grid grid-cols-2 gap-10 mt-4">
                        <input type="file" className="border-r border-b border-gray-300 p-2 rounded" />
                        <input type="file" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    <h2 className="text-3xl font-bold">Advisor</h2>
                    <div className="grid grid-cols-3 gap-10">
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
