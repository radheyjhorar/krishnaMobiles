import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StateList = () => {
  const [states, setStates] = useState([])
  const getState = async () => {
    let result = await fetch('http://localhost:5000/states', { method: 'Get' });
    result = await result.json();
    setStates(result);
  }
  useEffect(() => {
    getState();
  }, [])

  const deleteState = async (id) => {
    let result = await fetch(`http://localhost:5000/states/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getState();
    }
  }

  return (
    <div className='container'>
      <div className='heading-button-row'>
        <h3>State List</h3>
        <Link to="/add-state">
          <button className='app-button-two add-state-btn'>Add State</button>
        </Link>
      </div>
      
      <table>
        <tr>
        <th>State ID</th>
        <th>State Name</th>
        <th>Operation</th>
        </tr>
        
      {
        states.length > 0
          ? states.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>
                  <button style={{marginRight:'4px'}} onClick={()=>deleteState(item.id)}>Delete</button>
                  <Link to={"/update-state/" + item.id}>
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

export default StateList