import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemRows = ({ items, deleteItemRow, handleChangeItem }) => {

    return (
        items.map((data, index) => {
            const { item_name, item_rate, quantity, description } = data;
            console.log(item_rate);
            return (
                <tr key={index}>
                    <th scope='row' className="p-0">{index + 1}</th>
                    <td className="p-0">
                        <input 
                            type="text" 
                            className='table-input-box' 
                            name="item_name" 
                            value={item_name}
                            onChange={(evnt) => handleChangeItem(index, evnt)} 
                            placeholder='Item Name'
                        />
                    </td>
                    <td className="p-0">
                        <input 
                            type="number" 
                            className='table-input-box' 
                            name="item_rate" 
                            value={item_rate}
                            onChange={(evnt) => handleChangeItem(index, evnt)} 
                            placeholder='Item Rate'
                        />
                    </td>
                    <td className="p-0">
                        <input 
                            type="number" 
                            className='table-input-box' 
                            name="quantity" 
                            value={quantity}
                            onChange={(evnt) => handleChangeItem(index, evnt)} 
                            placeholder='Item Quantity'
                        />
                    </td>
                    <td className="p-0">
                        <input 
                            type="text" 
                            className='table-input-box' 
                            name="description" 
                            value={description}
                            onChange={(evnt) => handleChangeItem(index, evnt)} 
                            placeholder='Item Description'
                        />
                    </td>
                    <td className="p-0">
                        <input 
                            type="number" 
                            className='table-input-box' 
                            name="amount" 
                            value={item_rate * quantity}
                            placeholder='Item Total'
                            disabled     
                        />
                    </td>
                    <td className="p-0">
                        <Link to={""} className='btn btn-info btn-sm me-1' onClick={() => deleteItemRow(index)}>
                            <FontAwesomeIcon icon="fas fa-edit" className='text-white' />
                        </Link>
                        <Link className='btn btn-success btn-sm me-1'>
                            <FontAwesomeIcon icon="fas fa-save" className='text-white' />
                        </Link>
                    </td>
                </tr>
            )
        })


    )

};


export default ItemRows;