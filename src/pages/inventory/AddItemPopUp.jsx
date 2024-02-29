import { db } from '../../firebase-config';
import { collection, addDoc} from 'firebase/firestore';
import { useState } from 'react';
import Popup from 'reactjs-popup';

const AddItemPopUp = () => {
  
    const [itemInfo, setItemInfo] = useState({
        itemName: '',
        itemSKU: '',
        itemQty: '',
        itemPicURL: '',
        restockLimit: '',
    });
    
    const handleChange = (e) => {
        setItemInfo({
            ...itemInfo,
            [e.target.name]: e.target.value
        });
    };

    const itemsInDb = collection(db, "inventory");
    const handleAdd = () => {
        const newItem = {
            itemName: itemInfo.itemName,
            itemSKU: itemInfo.itemSKU,
            itemQty: itemInfo.itemQty,
            itemPicURL: itemInfo.itemPicURL,
            restockLimit: itemInfo.restockLimit
        }
        addDoc(itemsInDb, newItem)
        setItemInfo({
            itemName: '',
            itemSKU: '',
            itemQty: '',
            itemPicURL: '',
            restockLimit: '',
        });
    };

    return (
    <div className="bento">
       <Popup trigger={<button style={{color: '#D31145', background: '#d5d5d5'}}>Add New Item</button>} position='bottom center'>
       
       <input type="text" 
        id="itemName" 
        name="itemName" 
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400" 
        placeholder="Add New Item" 
        value={itemInfo.itemName} 
        onChange={handleChange}/>
        
        <input type="text" 
        id="itemSKU" 
        name="itemSKU" 
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400" 
        placeholder="SKU" 
        value={itemInfo.itemSKU} 
        onChange={handleChange}/>
        
        <input type="number" 
        id="itemQty" 
        name="itemQty" 
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400" 
        placeholder={itemInfo.itemQty === '' ? 'Inventory Number' : itemInfo.itemQty} 
        value={itemInfo.itemQty} 
        onChange={handleChange}/>
        
        <input type='number' 
        id="restockLimit" 
        name="restockLimit" 
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"  
        placeholder={itemInfo.restockLimit === '' ? 'Restock Limit' : itemInfo.restockLimit} 
        value= {itemInfo.restockLimit}
        onChange={handleChange}/>

        <input type="url" 
        id="itemPicURL" 
        name="itemPicURL"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400" 
        placeholder="Pic URL" 
        value={itemInfo.itemPicURL} 
        onChange={handleChange}/>
        <button onClick={handleAdd}>Add Item</button>

       </Popup>
   
    </div>
  )

}

export default AddItemPopUp