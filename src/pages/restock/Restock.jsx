import { Link } from 'react-router-dom';
import './Restock.css';
import CSVUploader from '../../components/updateStock/CSVUploader';
import ItemFrame from './ItemFrame';
import { useEffect, useState } from 'react';

import { db } from '../../../firebase-config';
import {collection, getDocs} from 'firebase/firestore';



function Restock() {
    
    const [itemFrames, setItemFrames] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "inventory"));
                const fetchedItems = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    fetchedItems.push({
                        sku: doc.id,
                        name: data.itemName,
                        restockNeeded: data.restockNeeded,
                        totalItemQty: data.totalItemQty,
                    });
                });
                setItemFrames(fetchedItems);
            } catch (error) {
                console.error('Error retrieving items:', error);
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <div className="bento">
            <Link to='/home'><p>Back</p></Link>
            <CSVUploader></CSVUploader>
            <h1 className="title">Items Needed:</h1>
            <div className="bento p-0">
                {/* //need to render one for each w/ restock value > their restock limit */}
                {itemFrames.map(item => (
                    <ItemFrame key={item.sku} itemName={item.name} restockNeeded={item.restockNeeded} totalItemQty={item.totalItemQty}/>
                ))}

            </div>

        </div>
    )
}

export default Restock;