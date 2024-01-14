import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddCity = () => {

  const [city, setCity] = useState({
    name: "",
    state: ""
  })

  const navigate = useNavigate()

  const addCity = async () => {
    if (!city.name || !city.state) {
      console.log("Field is empty...")
      return (false);
    }
    let result = await fetch('http://localhost:5000/cities', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(city)
    })
    result = await result.json();
    console.log(result);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value });
  }

  return (
    <div className='container'>
      <h1>Add City</h1>
      <input
        className='input-box'
        type='text'
        placeholder='Enter State Name'
        onChange={handleChange}
        name='name'
        value={city.name}
      />

      <select className='input-box select-box' name='state' onChange={handleChange}>
        <option value={0}>Select State</option>
        {states.map((item, index) => {
          return (
            <option value={item.id}>{item.name}</option>
          )
        })}
      </select>

      <button className='app-button' onClick={addCity}>
        Add City
      </button>
    </div>
  )
}

export default AddCity;