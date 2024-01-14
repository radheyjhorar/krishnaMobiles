import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateVendor = () => {

  // const [name, setName] = useState('');
  // const [mobile1, setMobile1] = useState();
  // const [mobile2, setMobile2] = useState();
  // const [address, setAddress] = useState('');
  // const [city, setCity] = useState('');

  const [vendor, setVendor] = useState({
    name: "",
    mobile1: "",
    mobile2: "",
    address: "",
    city: ""
  })

  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    getVendor();
  }, []);

  const getVendor = async () => {
    let result = await fetch(`http://localhost:5000/vendors/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json();
    setVendor({
      ...vendor,
      name: result[0].vendor_name,
      mobile1: result[0].mobile1,
      mobile2: result[0].mobile2,
      address: result[0].address,
      city: result[0].city
    });
  }

  const updateVendor = async () => {
    let result = await fetch(`http://localhost:5000/vendors/${params.id}`, {
      method: "Put",
      body: JSON.stringify(vendor),
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json()
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value })
  };

  return (
    <div className='container'>
      <h1>Update Vendor</h1>
      <input
        className='input-box'
        type='text'
        placeholder='Enter City Name'
        onChange={handleChange}
        name='name'
        value={vendor.name}
      />

      <input
        className='input-box'
        type='number'
        placeholder='Enter Mobile 1'
        onChange={handleChange}
        name='mobile1'
        value={vendor.mobile1}
      />

      <input
        className='input-box'
        type='number'
        placeholder='Enter Mobile 2'
        onChange={handleChange}
        name='mobile2'
        value={vendor.mobile2}
      />

      <input
        className='input-box'
        type='text'
        placeholder='Enter Vendor Address'
        onChange={handleChange}
        name='address'
        value={vendor.address}
      />

      <select className='input-box select-box' name='city' onChange={handleChange}>
        <option value={0}>Select City</option>
        {cities.map((item, index) => {
          return (
            <option key={index} value={item.id} selected={item.id === vendor.city}>{item.name}</option>
          )
        })}
      </select>

      <button className='app-button' onClick={updateVendor}>
        Update Vendor
      </button>
    </div>
  )
}

export default UpdateVendor;