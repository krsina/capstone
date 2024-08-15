import React, { useState } from 'react';
// import FieldCounter from '../../common/FieldCounter';
import BackButton from '../../common/BackButton';
import OfficerField from '../../common/OfficerField';

function ClubRenewal() {
  const [officers, setOfficers] = useState(Array.from({ length: 5 }, () => ({ email: '', first_name: '', last_name: '', position: '' })));
  const [emailErrors, setEmailErrors] = useState(Array.from({ length: 5 }, () => false));
  const [club_id, setClub_id] = useState('');
  const addOfficer = () => {
    setOfficers([...officers, { email: '', first_name: '', last_name: '', position: '' }]);
    setEmailErrors([...emailErrors, false]);
  };

  const removeOfficer = (index) => {
    setOfficers(officers.filter((_, i) => i !== index));
    setEmailErrors(emailErrors.filter((_, i) => i !== index));
  };

  const handleOfficerChange = (index, field, value) => {
    const newOfficers = officers.map((officer, i) => {
      if (i === index) {
        return {
          ...officer,
          [field]: value,
        };
      }
      return officer;
    });

    // Validates the email as UW email
    if (field === 'email') {
      const newEmailErrors = emailErrors.map((error, i) => {
        if (i === index) {
          return !value.includes('@uw.edu');
        }
        return error;
      });
      setEmailErrors(newEmailErrors);
    }

    setOfficers(newOfficers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let success = true;
    // Submit the form
    officers.forEach((officer) => {
      fetch('http://localhost:3001/club/insertOfficer', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id,
          email: officer.email,
          first_name: officer.first_name,
          last_name: officer.last_name,
          position: officer.position,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
          success = false;
        });
    });
    if (success) {
      fetch('http://localhost:3001/club/setClubStatus', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id,
          status: 'active',
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
          success = false;
        });
    }
  };

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
            <h2 className="text-2xl font-bold mb-4">Club ID</h2>
            <div>
              <input type="text" placeholder="Club ID" className="mt-1 block w-full border-r border-b border-gray-300 p-4 rounded-md shadow-sm focus:border-primary focus:ring-primary" onChange={(e) => setClub_id(e.target.value)} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Officers</h2>
            <p className="text-lg font-light mb-4">Please provide details of the club officers below.</p>
            <OfficerField
              officers={officers}
              emailErrors={emailErrors}
              addOfficer={addOfficer}
              removeOfficer={removeOfficer}
              handleOfficerChange={handleOfficerChange}
            />
          </section>
          <button type="button" className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded focus:outline-none focus:shadow-outline mt-8" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ClubRenewal;
