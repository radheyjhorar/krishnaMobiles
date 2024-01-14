import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCity = () => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    let result = await fetch(`http://localhost:5000/cities/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json();
    setName(result[0].name);
    setState(result[0].state);
  }

  const updateCity = async () => {
    let result = await fetch(`http://localhost:5000/cities/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, state }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json()
    navigate('/cities')
  }

  const [states, setStates] = useState([])
  const getState = async () => {
    let result = await fetch('http://localhost:5000/states', { method: 'Get' });
    result = await result.json();
    setStates(result);
  }
  useEffect(() => {
    getState();
  }, [])

  return (
    <div className='container'>
      <h1>Update City</h1>
      <input
        className='input-box'
        type='text'
        placeholder='Enter City Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <select className='input-box select-box' onChange={(e) => setState(e.target.value)}>
        <option value={0}>Select State</option>
        {states.map((item, index) => {
          return (
            <option value={item.id} selected={item.id === state}>{item.name}</option>
          )
        })}
      </select>

      <button className='app-button' onClick={updateCity}>
        Update City
      </button>
    </div>
  )
}

export default UpdateCity;