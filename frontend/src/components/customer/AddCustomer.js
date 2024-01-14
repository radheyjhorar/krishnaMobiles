import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {

  const [customer, setCustomer] = useState({
    name: "",
    mobile1: "",
    mobile2: "",
    address: "",
    city: ""
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addCustomer = async () => {
    if (!customer.name || !customer.mobile1 || !customer.address || !customer.city) {
      console.log("Field is empty...")
      setError(true);
      return (false);
    }

    let result = await fetch('http://localhost:5000/customers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer)
    })
    result = await result.json();
    console.log(result);
    navigate('/customer-list')
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
    setCustomer({ ...customer, [name]: value });
  };

  return (
    <div className='container'>
      <h1>Add Customer</h1>
      <input
        className='input-box'
        type='text'
        name='name'
        placeholder='Enter Customer Name'
        onChange={handleChange}
        value={customer.name}
      />

      <input
        className='input-box'
        type='number'
        placeholder='Enter Mobile 1'
        name='mobile1'
        onChange={handleChange}
        value={customer.mobile1}
      />

      <input
        className='input-box'
        type='number'
        placeholder='Enter Mobile 2'
        name='mobile2'
        onChange={handleChange}
        value={customer.mobile2}
      />

      <input
        className='input-box'
        type='text'
        placeholder='Enter Customer Address'
        name='address'
        onChange={handleChange}
        value={customer.address}
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
      <button className='app-button' onClick={addCustomer}>
        Add Customer
      </button>
    </div>
  )
}

export default AddCustomer;