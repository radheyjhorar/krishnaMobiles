import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VendorStockList = () => {

  const [vendorStock, setVendorStock] = useState([])
  const getVendorStock = async () => {
    let result = await fetch('http://localhost:5000/vendorstock', { method: 'Get' });
    result = await result.json();
    setVendorStock(result);
  }
  useEffect(() => {
    getVendorStock();
  }, [])

  const deleteVendor = async (id) => {
    let result = await fetch(`http://localhost:5000/vendors/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getVendorStock();
    }
  }

  return (
    <div className='container'>
      <div className='heading-button-row'>
        <h3>Vendor Stock List</h3>
        <div className='mutiple-buttons'>
        </div>
      </div>
      <table className='font-12'>
        <tr>
          <th>Vendor ID</th>
          <th>Vendor Name</th>
          <th>Invioce Number</th>
          <th>Order Date</th>
          <th>Amount</th>
          <th>Items</th>
          <th>Operation</th>
        </tr>

        {
          vendorStock.length > 0
            ? vendorStock.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.vendor_name}</td>
                  <td>{item.invoice_number}</td>
                  <td>{item.order_date}</td>
                  <td>{item.amount}</td>
                  <td>{item.items}</td>
                  <td className='p-0'>
                    <button style={{ marginRight: '4px' }}>Delete</button>
                    <Link to={""}>
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

export default VendorStockList