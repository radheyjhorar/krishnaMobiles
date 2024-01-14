import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateVendorPayment = () => {

  const [payment, setPayment] = useState({
    vendorName: "",
    amount: "",
    pamentMethod: "",
    date: "",
    description: ""
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    let result = await fetch(`http://localhost:5000/vendor-payment/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json();
    setPayment({
      ...payment,
      vendorName: result[0].vendor_id,
      amount: result[0].amount,
      pamentMethod: result[0].payment_method,
      date: result[0].payment_date,
      description: result[0].description
    });
  }

  const updatePayment = async () => {
    let result = await fetch(`http://localhost:5000/vendor-payment/${params.id}`, {
      method: "Put",
      body: JSON.stringify(payment),
      headers: {
        "Content-Type": "application/json",
      }
    });
    result = await result.json()
    navigate('/vendor-payment-list')
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
    setPayment({ ...payment, [name]: value })
  };

  return (
    <div className='container'>
      <h1>Update Payment</h1>
      <select className='input-box select-box' name='vendorName' onChange={handleChange}>
        <option value={0}>Vendor Name</option>
        {vendors.map((item, index) => {
          return(
            <option key={index} value={item.id} selected={item.id === payment.vendorName}>{item.vendor_name}</option>
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

      <select className='input-box select-box' name='pamentMethod' value={payment.pamentMethod} onChange={handleChange}>
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
      <button className='app-button' onClick={updatePayment}>
        Update Payment
      </button>
    </div>
  )
}

export default UpdateVendorPayment;