import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VendorList = () => {

  const [vendors, setVendors] = useState([])
  const getVendor = async () => {
    let result = await fetch('http://localhost:5000/vendors', { method: 'Get' });
    result = await result.json();
    setVendors(result);
  }
  useEffect(() => {
    getVendor();
  }, [])

  const deleteVendor = async (id) => {
    let result = await fetch(`http://localhost:5000/vendors/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getVendor();
    }
  }

  return (
    <div className='container'>
      <div className='heading-button-row'>
        <h3>Vendor List</h3>
        <div className='mutiple-buttons'>
          <Link to="/vendor-payment-list">
            <button className='app-button-two add-state-btn'>Vender Payment</button>
          </Link>
          <Link to="/vendor-stock-list">
            <button className='app-button-two add-state-btn'>Vender Stock</button>
          </Link>
          <Link to="/vendor-stock-item">
            <button className='app-button-two add-state-btn'>Order Now</button>
          </Link>
          <Link to="/add-vendor">
            <button className='app-button-two add-state-btn'>Add Vendor</button>
          </Link>
        </div>
      </div>
      <table className='font-12'>
        <tr>
          <th>Vendor ID</th>
          <th>Vendor Name</th>
          <th>Vendor Mobile1</th>
          <th>Vendor Mobile2</th>
          <th>Vendor Address</th>
          <th>Vendor City</th>
          <th>Operation</th>
        </tr>


        {
          vendors.length > 0
            ? vendors.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.vendor_name}</td>
                  <td>{item.mobile1}</td>
                  <td>{item.mobile2}</td>
                  <td>{item.address}</td>
                  <td>{item.city_name}</td>
                  {/* <td>{item.state_name}</td> */}
                  <td className='p-0'>
                    <button style={{ marginRight: '4px' }} onClick={() => deleteVendor(item.id)}>Delete</button>
                    <Link to={"/update-vendor/" + item.id}>
                      <button style={{ marginRight: '4px' }}>Update</button>
                    </Link>
                    <Link to={"/vendor-stock-item-list/" + item.id}>
                      <button>Order</button>
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

export default VendorList;