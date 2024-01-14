import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CityList = () => {
  const [cities, setCities] = useState([])
  const getCity = async () => {
    let result = await fetch('http://localhost:5000/cities', { method: 'Get' });
    result = await result.json();
    setCities(result);
  }
  useEffect(() => {
    getCity();
  }, [])

  const deleteCity = async (id) => {
    let result = await fetch(`http://localhost:5000/cities/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getCity();
    }
  }

  return (
    <div className='container'>
      <div className='heading-button-row'>
        <h3>City List</h3>
        <Link to="/add-city">
          <button className='app-button-two add-state-btn'>Add city</button>
        </Link>
      </div>
      <table>
        <tr>
          <th>City ID</th>
          <th>City Name</th>
          <th>State Name</th>
          <th>Operation</th>
        </tr>


        {
          cities.length > 0
            ? cities.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.state_name}</td>
                  <td>
                    <button style={{ marginRight: '4px' }} onClick={() => deleteCity(item.id)}>Delete</button>
                    <Link to={"/update-city/" + item.id}>
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

export default CityList;