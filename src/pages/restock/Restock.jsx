import { Link } from 'react-router-dom';
import './Restock.css';
import CSVUploader from '../../components/updateStock/CSVUploader';
import ItemFrame from './ItemFrame';
import { useEffect, useState } from 'react';

import { db } from '../../../firebase-config';
import {collection, getDocs} from 'firebase/firestore';

import Loading from '../../components/loading/Loading';
//To-Do: loading doesnt work 

function Restock() {
    
    const [itemFrames, setItemFrames] = useState([]);
   const [isLoading, setIsLoading] = useState(false)
   
const handleClear = () => {
    //for each, set restockNeeded 0;
}

    useEffect(() => {
        const fetchData = async () => {
            //setIsLoading(true)
            try {
                const querySnapshot = await getDocs(collection(db, "inventory"));
                const fetchedItems = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const newItem = {
                        id: doc.id,
                        itemSKU: data.itemSKU,
                        itemName: data.itemName,
                        restockNeeded: data.restockNeeded,
                        restockLimit: data.restockLimit,
                        totalItemQty: data.totalItemQty,
                        backstockLocation: data.backstockLocation,
                        itemPic: data.itemPic,
                        //to-do: figure out photo adding logic
                    }
                    if (newItem.restockNeeded >= newItem.restockLimit) {
                        fetchedItems.push(newItem);
                    }
                });
                setItemFrames(fetchedItems);
            } catch (error) {
                console.error('Error retrieving items:', error);
            } finally {
                 setIsLoading(false)
            }
        };
    
        fetchData();
    }, []);
    
    if (isLoading === true) {
        return (<Loading />)
    }
    return (
        <div className="bento">
            <Link to='/home'><p>Back</p></Link>
            {itemFrames.length === 0 && <div className="f text-center bg-red-800">All items collected!</div>}
            {itemFrames.length > 0 && <div>
                <h1 className="title">Items Needed:</h1>
                <div className="bento p-0">
                    {/* //need to render one for each w/ restock value > their restock limit */}
                    {itemFrames.map(item => (  
                        <ItemFrame key={item.id} item={item}/>
                    ))}
                </div>
            </div>}
<div className='card ' onClick={handleClear}>Clear All</div>
            <CSVUploader></CSVUploader>

        </div>
    )
}

export default Restock;