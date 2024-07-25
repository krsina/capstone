import React from 'react'
import FieldCounter from '../../common/FieldCounter';
import BackButton from '../../common/BackButton';
import OfficerField from '../../common/OfficerField';

function ClubRenewal() {


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

                    <div className="gap-4 grid">
                        <h2 className="text-3xl font-bold">Officers</h2>
                        <p className="text-lg font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        <OfficerField />
                    </div>

                    {/* Club Description */}
                    < h2 className="text-3xl font-bold" > Club Description</h2>
                    <FieldCounter placeholder="Enter Description here" type="textarea" maxWords={300} />

                    {/* Club Mission */}
                    <h2 className="text-3xl font-bold">Mission</h2>
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
