import React, { useState } from 'react'
import FieldCounter from '../../common/FieldCounter';
import BackButton from '../../common/BackButton';
import OfficerField from '../../common/OfficerField';
import e from 'cors';

function ClubRegistration() {
    const [isAffiliated, setIsAffiliated] = useState("");

    const handleAffilation = (e) => {
        setIsAffiliated(e.target.value);
    }


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-20 sm:ml-80">
            <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10">
                <BackButton />
                <div className="bg-primary p-6 rounded-lg text-center mb-8">
                    <h1 className="text-5xl font-bold text-white">Club Registration</h1>
                </div>

                <form className="space-y-8 text-secondary">
                    <section id="basicInfo">
                        <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <input type="text" placeholder="Club Name" className="block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                                <label className="block text-sm font-light italic text-gray-500 mt-2">Club Name</label>
                            </div>
                            <div>
                                <input type="text" placeholder="Club Category" className="block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                                <label className="block text-sm font-light italic text-gray-500 mt-2">Club Name</label>
                            </div>
                        </div>
                    </section>

                    <section id="affilation">
                        <h2 className="text-2xl font-bold mb-4">Affiliation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div>
                                <label className="block font-light  text-gray-500 mt-2">Is your club affilated?</label>
                                <select type="text"
                                    className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md"
                                    value={isAffiliated}
                                    onChange={handleAffilation}
                                >
                                    <option value="" disabled>Select below </option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <small className="text-gray-500 font-light italic">Could be local, regional, national, or international</small>
                            </div>
                            {isAffiliated === 'yes' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name of umbrella Organizations</label>
                                        <input type="text" placeholder="Name of umbrella Organizations" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name of outside Organizations</label>
                                        <input type="text" placeholder="Name of outside Organizations" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                                    </div>
                                </>
                            )}

                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Club Description</h2>
                        <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Mission</h2>
                        <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Vision</h2>
                        <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Purpose</h2>
                        <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Meeting Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meeting Times</label>
                                <input type="text" placeholder="Meeting Times" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meeting Days</label>
                                <input type="text" placeholder="Meeting Days" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input type="text" placeholder="Location" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Uploads</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Club cover</label>
                                <input type="file" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Constitution</label>
                                <input type="file" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Advisor</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" placeholder="First Name" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" placeholder="Last Name" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Advisor Email</label>
                                <input type="text" placeholder="Advisor Email" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Officers</h2>
                        <p className="text-lg font-light mb-4">Please provide details of the club officers below.</p>
                        <OfficerField />
                    </section>

                    <button className=" bg-secondary text-white font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline mt-8">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ClubRegistration
