import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomerList = () => {

  const [customers, setCustomers] = useState([])
  const getCustomer = async () => {
    let result = await fetch('http://localhost:5000/customers', { method: 'Get' });
    result = await result.json();
    setCustomers(result);
  }
  useEffect(() => {
    getCustomer();
  }, [])

  const deleteCustomer = async (id) => {
    let result = await fetch(`http://localhost:5000/customers/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getCustomer();
    }
  }


  return (
    <div className='container'>
      <div className='heading-button-row'>
        <h3>Customer List</h3>
        <div className='mutiple-buttons'>
          <Link to="/customer-payment-list">
            <button className='app-button-two add-state-btn'>Customer Payment</button>
          </Link>
          <Link to="/customer-stock-list">
            <button className='app-button-two add-state-btn'>Customer Stock</button>
          </Link>
          <Link to="/customer-stock-item">
            <button className='app-button-two add-state-btn'>Order Now</button>
          </Link>
          <Link to="/add-customer">
            <button className='app-button-two add-state-btn'>Add Customer</button>
          </Link>
        </div>
      </div>
      <table className='font-12'>
        <tr>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Customer Mobile1</th>
          <th>Customer Mobile2</th>
          <th>Customer Address</th>
          <th>Customer City</th>
          <th>Operation</th>
        </tr>


        {
          customers.length > 0
            ? customers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.mobile1}</td>
                  <td>{item.mobile2}</td>
                  <td>{item.address}</td>
                  <td>{item.city_name}</td>
                  <td className='p-0'>
                    <button 
                      style={{ marginRight: '4px' }} 
                      onClick={() => deleteCustomer(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={"/update-customer/" + item.id}>
                      <button>Update</button>
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

export default CustomerList