import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VendorPaymentList = () => {

  const [payments, setPayments] = useState([])
  const getVendorPayment = async () => {
    let result = await fetch('http://localhost:5000/vendor-payment', { method: 'Get' });
    result = await result.json();
    setPayments(result);
  }
  useEffect(() => {
    getVendorPayment();
  }, [])

  const deletePayment = async (id) => {
    let result = await fetch(`http://localhost:5000/vendor-payment/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getVendorPayment();
    }
  }

  return (
    <div className='container'>
      <div className='heading-button-row'>
        <h3>Vendor Payment List</h3>
        <div className='mutiple-buttons'>
          <Link to="/vendor-payment">
            <button className='app-button-two add-state-btn'>Add Payment</button>
          </Link>
        </div>
      </div>
      <table className='font-12'>
        <tr>
          <th>Payment ID</th>
          <th>Vendor Name</th>
          <th>Amount</th>
          <th>Payment Method</th>
          <th>Payment Date</th>
          <th>Description</th>
          <th>Operation</th>
        </tr>


        {
          payments.length > 0
            ? payments.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.vendor_name}</td>
                  <td>{item.amount}</td>
                  <td>{item.payment_method}</td>
                  <td>{item.payment_date}</td>
                  <td>{item.description}</td>
                  <td className='p-0'>
                    <button style={{ marginRight: '4px' }} onClick={() => deletePayment(item.id)}>Delete</button>
                    <Link to={"/update-vendor-payment/" + item.id}>
                      <button style={{ marginRight: '4px' }}>Update</button>
                    </Link>
                  </td>
                </tr>
              )
            })
            : <h1>No result found</h1>
        }
      </table>
    </div>
  )
}

export default VendorPaymentList;