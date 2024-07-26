import React from 'react'
import FieldCounter from '../../common/FieldCounter';
import BackButton from '../../common/BackButton';
import OfficerField from '../../common/OfficerField';

function ClubRenewal() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-20 sm:ml-80">
            <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <BackButton />
                <div className="bg-primary p-6 rounded-lg text-center mb-8">
                    <h1 className="text-5xl font-bold text-white">Club Renewal</h1>
                </div>

                <form className="space-y-8 text-secondary">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Club Council Approval</h2>
                        <p className="text-lg font-light mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Club Name</h2>
                        <div>
                            <input type="text" placeholder="Club Name" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Officers</h2>
                        <p className="text-lg font-light mb-4">Please provide details of the club officers below.</p>
                        <OfficerField />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Club Description</h2>
                        <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Mission</h2>
                        <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />
                    </section>

                    <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline mt-8">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ClubRenewal
