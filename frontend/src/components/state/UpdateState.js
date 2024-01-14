import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateState = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    getState();
  }, [])

  const getState = async () => {
    let result = await fetch(`http://localhost:5000/states/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json();
    setName(result[0].name);
  }

  const updateState = async () => {
    let result = await fetch(`http://localhost:5000/states/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json()
    navigate('/')
  }

  return (
    <div className='container'>
      <h1>Update State</h1>
      <input   
        className='input-box' 
        type='text'
        placeholder='Enter State Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <button className='app-button' onClick={updateState}>
        Update State
      </button>
    </div>
  )
}

export default UpdateState