import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const VendorPayment = () => {

  const [payment, setPayment] = useState({
    vendorName: "",
    amount: "",
    pamentMethod: "",
    date: "",
    description: ""
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addPayment = async () => {
    if (!payment.vendorName || !payment.amount || !payment.pamentMethod || !payment.date) {
      console.log("Field is empty...", payment)
      setError(true);
      return (false);
    }

    let result = await fetch('http://localhost:5000/vendor-payment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment)
    })
    result = await result.json();
    console.log(result);
    navigate('/vendor')
  }

  const [vendors, setVendors] = useState([])
  const getVendor = async () => {
    let result = await fetch('http://localhost:5000/vendors', { method: 'Get' });
    result = await result.json();
    setVendors(result);
  }
  useEffect(() => {
    getVendor();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  return (
    <div className='container'>
      <h1>Add Payment</h1>
      <select className='input-box select-box' name='vendorName' onChange={handleChange}>
        <option value={0}>Vendor Name</option>
        {vendors.map((item, index) => {
          return(
            <option key={index} value={item.id}>{item.vendor_name}</option>
          )
        })}
      </select>

      <input
        className='input-box'
        type='number'
        placeholder='Enter Amount'
        name='amount'
        onChange={handleChange}
        value={payment.amount}
      />

      <select className='input-box select-box' name='pamentMethod' onChange={handleChange}>
        <option value={''}>Payment Method</option>
        <option value={'phonePay'}>PhonePay</option>
        <option value={'googlePay'}>GooglePay</option>
        <option value={'bankAccount'}>Bank Account</option>
        <option value={'cash'}>Cash</option>
      </select>

      <input
        className='input-box'
        type='date'
        placeholder='Payment Date'
        name='date'
        onChange={handleChange}
        value={payment.date}
      />

      <input
        className='input-box'
        type='text'
        placeholder='Payment Description'
        name='description'
        onChange={handleChange}
        value={payment.description}
      />

      {error ? <span className='error-field'>Please fill empty fields</span> : false}
      <button className='app-button' onClick={addPayment}>
        Add Payment
      </button>
    </div>
  )
}

export default VendorPayment