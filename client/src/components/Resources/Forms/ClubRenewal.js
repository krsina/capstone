import React, { useState } from 'react'
import FieldCounter from '../../common/FieldCounter';
import BackButton from '../../common/BackButton';

function ClubRenewal() {
    const [officers, setOfficers] = useState(Array.from({ length: 5 }, () => ({ email: '', name: '', position: '' })))

    const addOfficer = () => {
        setOfficers([...officers, { email: '', name: '', position: '' }])
    }

    const removeOfficer = (index) => {
        const newOfficers = officers.filter((_, i) => i !== index)
        setOfficers(newOfficers)
    }

    const handleOfficerChange = (index, field, value) => {
        const newOfficers = officers.map((officer, i) => {
            if (i === index) {
                return {
                    ...officer,
                    [field]: value
                }
            }
            return officer;
        })

        setOfficers(newOfficers)
    }

    return (
        <div className="bg-gray-300 py-20 flex flex-row items-center justify-center ml-80">
            <BackButton />
            <div className="w-11/12 bg-white py-20 px-24 rounded-lg">
                <div className="bg-primary p-4 rounded-lg flex  items-center justify-center">
                    <h1 className="text-6xl font-encode-sans font-bold text-white px-6 py-4">Club Renewal</h1>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-8 text-secondary font-open-sans text-lg">
                    <div className="space-x-1">
                        <h2 className="text-3xl font-bold ">Club Council Approval</h2>
                        <p className="text-lg font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>

                    <div className="grid gap-4 mt-4 w-7/12">
                        <h2 className="text-3xl font-bold ">Club Name</h2>
                        <input type="text" placeholder="Club Name" className="border-r border-b border-gray-300 p-2 rounded" />
                    </div>

                    <div className="gap-4 grid mt-4">
                        <h2 className="text-3xl font-bold">Officers</h2>

                        <p className="text-lg font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        {officers.map((officer, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 space-y-4 items-center">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="border-r border-b border-gray-300 p-2 rounded"
                                    value={officer.email}
                                    onChange={(e) => handleOfficerChange(index, 'email', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border-r border-b border-gray-300 p-2 rounded"
                                    value={officer.name}
                                    onChange={(e) => handleOfficerChange(index, 'name', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Position"
                                    className="border-r border-b border-gray-300 p-2 rounded"
                                    value={officer.position}
                                    onChange={(e) => handleOfficerChange(index, 'position', e.target.value)}
                                />

                                {index >= 5 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOfficer(index)}
                                        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 "
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOfficer}
                            className="bg-secondary hover:bg-primary text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
                        >
                            Add Member
                        </button>

                    </div>

                    {/* Club Description */}
                    <h2 className="text-2xl font-medium">Club Description</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    {/* Club Mission */}
                    <h2 className="text-2xl font-medium">Mission</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

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

export default ClubRenewal
