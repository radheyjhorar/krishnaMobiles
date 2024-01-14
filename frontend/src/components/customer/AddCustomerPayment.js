import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddCustomerPayment = () => {

  const [payment, setPayment] = useState({
    customerName: "",
    amount: "",
    paymentMethod: "",
    date: "",
    description: ""
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addPayment = async () => {
    if (!payment.customerName || !payment.amount || !payment.paymentMethod || !payment.date) {
      console.log("Field is empty...", payment)
      setError(true);
      return (false);
    }

    let result = await fetch('http://localhost:5000/customer-payment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment)
    })
    result = await result.json();
    console.log(result);
    navigate('/customer-payment-list')
  }

  const [customers, setCustomers] = useState([])
  const getCustomer = async () => {
    let result = await fetch('http://localhost:5000/customers', { method: 'Get' });
    result = await result.json();
    setCustomers(result);
  }
  useEffect(() => {
    getCustomer();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  return (
    <div className='container'>
      <h1>Add Payment</h1>
      <select className='input-box select-box' name='customerName' onChange={handleChange}>
        <option value={0}>Customer Name</option>
        {customers.map((item, index) => {
          return(
            <option key={index} value={item.id}>{item.customer_name}</option>
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

      <select className='input-box select-box' name='paymentMethod' onChange={handleChange}>
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

export default AddCustomerPayment;