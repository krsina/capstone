import React, { useState } from 'react';

function TestClubFunctionality() {
    const [club_name, setClubName] = useState('');
    const [club_delete, setClubNameDelete] = useState('');
    const [description, setDescription] = useState('');

    const handlePost = (event) => {
        event.preventDefault(); // Prevent form from causing a page refresh
        fetch('http://localhost:3001/club/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: club_name,
                description,
            }),
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    
    const handleDelete = (event) => {
        event.preventDefault(); // Prevent form from causing a page refresh
        fetch('http://localhost:3001/club/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: club_delete,
            }),
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    };



    return (
        <div className='ml-96'>
            <h1>Test Club Functionality</h1>
            <form onSubmit={handlePost}>
                <input className="border rounded border-gray-400" type="text" value={club_name} onChange={e => setClubName(e.target.value)} placeholder="Club Name" />
                <input className="border rounded border-gray-400" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
                <button className="border rounded border-gray-400"type="submit">Post</button>
            </form>
            <form onSubmit={handleDelete}>
                <input className="border rounded border-gray-400" type="text" value={club_delete} onChange={e => setClubNameDelete(e.target.value)} placeholder="Club Name" />
                <button className="border rounded border-gray-400"type="submit">Delete</button>
            </form>
        </div>
    );
}

export default TestClubFunctionality;