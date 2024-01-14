import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddVendor = () => {
  const [vendor, setVendor] = useState({
    name: "",
    mobile1: "",
    mobile2: "",
    address: "",
    city: ""
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addVendor = async () => {
    if (!vendor.name || !vendor.mobile1 || !vendor.address || !vendor.city) {
      console.log("Field is empty...")
      setError(true);
      return (false);
    }

    let result = await fetch('http://localhost:5000/vendors', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendor)
    })
    result = await result.json();
    console.log(result);
    navigate('/vendor')
  }

  const [cities, setCities] = useState([])
  const getCities = async () => {
    let result = await fetch('http://localhost:5000/cities', { method: 'Get' });
    result = await result.json();
    setCities(result);
  }
  useEffect(() => {
    getCities();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  return (
    <div className='container'>
      <h1>Add Vendor</h1>
      <input
        className='input-box'
        type='text'
        name='name'
        placeholder='Enter Vendor Name'
        onChange={handleChange}
        value={vendor.name}
      />

      <input
        className='input-box'
        type='number'
        placeholder='Enter Mobile 1'
        name='mobile1'
        onChange={handleChange}
        value={vendor.mobile1}
      />

      <input
        className='input-box'
        type='number'
        placeholder='Enter Mobile 2'
        name='mobile2'
        onChange={handleChange}
        value={vendor.mobile2}
      />

      <input
        className='input-box'
        type='text'
        placeholder='Enter Vendor Address'
        name='address'
        onChange={handleChange}
        value={vendor.address}
      />

      <select className='input-box select-box' name='city' onChange={handleChange}>
        <option value={0}>Select City</option>
        {cities.map((item, index) => {
          return (
            <option key={index} value={item.id}>{item.name}</option>
          )
        })}
      </select>

      {error ? <span className='error-field'>Please fill empty fields</span> : false}
      <button className='app-button' onClick={addVendor}>
        Add Vendor
      </button>
    </div>
  )
}

export default AddVendor;