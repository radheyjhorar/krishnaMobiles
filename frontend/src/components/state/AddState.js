import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddState = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate()

  const addState = async() => {
    if(!name) {
      console.log("Field is empty...")
      return(false);
    }
    let result = await fetch('http://localhost:5000/states', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name})
    })
    result = await result.json();
    console.log(result);
    navigate('/')
  }
  

  return (
    <div className='container'>
      <h1>Add State</h1>
      <input   
        className='input-box' 
        type='text'
        placeholder='Enter State Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <button className='app-button' onClick={addState}>
        Add State
      </button>
    </div>
  )
}

export default AddState;