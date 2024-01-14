import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import ItemRows from './ItemRows';

const VendorStockItem = () => {

  const [stock, setStock] = useState({
    venderName: "",
    invoiceNumber: "",
    orderDate: "",
    items: []
  })

  const [itemData, setItemData] = useState([])

  const addItemRow = () => {
    const rowsInput = {
      itemName: "",
      itemRate: "",
      itemQuantity: "",
      itemDescription: ""
    }
    setItemData([...itemData, rowsInput])
  }

  const deleteItemRow = (index) => {
    const items = [...itemData];
    items.splice(index, 1);
    setItemData(items);
  }

  const handleChangeItem = (index, evnt) => {

    const { name, value } = evnt.target;
    const items = [...itemData];
    items[index][name] = value;

    if (name == 'item_rate' || name == 'quantity') {
      items[index]['amount'] = items[index]['item_rate'] * items[index]['quantity']
    }
    setItemData(items);

  }

  const navigate = useNavigate();

  const placeOrder = async () => {
    if (
      !stock.venderName ||
      !stock.invoiceNumber ||
      !stock.orderDate
    ) {
      console.log("Field is empty...", stock)
      return (false);
    }
    let result = await fetch('http://localhost:5000/vendorstockitem', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock)
    })
    result = await result.json();
    console.log(result);
    navigate('/vendor-stock-item')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
    setItemData({ ...itemData, [name]: value });
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

  return (
    <div className='container'>
      <div className='heading-button-row'>
        <h3>Vendor Stock Item</h3>
        <div className='mutiple-buttons p-20-0'>
          <select name='venderName' onChange={handleChange}>
            <option value={0}>Select Vendor</option>
            {vendors.map((item, index) => {
              return (
                <option key={index} value={item.id}>{item.vendor_name}</option>
              )
            })}
          </select>

          <input
            type='text'
            placeholder='Enter invoice number'
            name='invoiceNumber'
            value={itemData.invoiceNumber}
            onChange={handleChange}
          />

          <input
            type='date'
            placeholder='Enter order date'
            name='orderDate'
            value={itemData.orderDate}
            onChange={handleChange}
          />

        </div>
        <button className='app-button-two' onClick={placeOrder}>Place Order</button>
      </div>

      <table className='font-12'>
        <tr>
          <th>S.No</th>
          <th>Item Name</th>
          <th>Item Rate</th>
          <th>Item Quantity</th>
          <th>Item Description</th>
          <th>Item Total</th>
          <th>
            <button onClick={addItemRow}>New Line</button>
         </th>
        </tr>

        {/* <tr>
          <td className='p-0'>
            <input
              type='text'
              className='table-input-box'
              name='itemName'
              onChange={handleChange}
              placeholder='Item Name'
            />
          </td>
          <td className='p-0'>
            <input
              className='table-input-box'
              type='text'
              name='itemRate'
              onChange={handleChange}
              placeholder='Item Rate'
            />
          </td>
          <td className='p-0'>
            <input
              type='text'
              name='itemQuantity'
              onChange={handleChange}
              placeholder='Item Quantity'
              className='table-input-box'
            />
          </td>
          <td className='p-0'>
            <input
              type='text'
              name='itemDescription'
              onChange={handleChange}
              placeholder='Item Description'
              className='table-input-box'
            />
          </td>
          <td>{itemData.itemRate * itemData.itemQuantity}</td>
          <td>
            <button onClick={addItemRow}>Add</button>
          </td>
        </tr> */}
        <ItemRows items={itemData} deleteItemRow={deleteItemRow} handleChangeItem={handleChangeItem} />
      </table>
    </div>
  )
}

export default VendorStockItem;