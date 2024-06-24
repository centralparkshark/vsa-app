import { Link } from 'react-router-dom';
import './Restock.css';
import CSVUploader from '../../components/updateStock/CSVUploader';
import ItemFrame from './ItemFrame';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase-config';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import Loading from '../../components/loading/Loading';
//To-Do: loading doesnt work 

function Restock() {
    const [itemFrames, setItemFrames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "inventory"));
                const fetchedItems = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data
                    };
                });
                setItemFrames(fetchedItems);
            } catch (error) {
                console.error('Error retrieving items:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);

    const handleClear = async () => {
        if (window.confirm('Are you sure you want to clear all items?')) {
            try {
                const updatedItems = itemFrames.map(item => ({
                    ...item,
                    restockNeeded: 0
                }));

                for (const item of updatedItems) {
                    const itemRef = doc(db, 'inventory', item.id);
                    await updateDoc(itemRef, { restockNeeded: 0 });
                }

                setItemFrames(updatedItems);
            } catch (error) {
                console.error('Error updating items:', error);
            }
        }
    }
    
    if (isLoading) {
        return <Loading />;
    }

    const itemsToRestock = itemFrames.filter(item => item.restockNeeded > 0);

    return (
        <div className="bento">
            <Link to='/home'><p>Back</p></Link>
            {itemsToRestock.length === 0 && <div className="f text-center bg-red-800">All items collected!</div>}
            {itemsToRestock.length > 0 && (<div>
                <h1 className="title">Items Needed:</h1>
                <div className="p-2 grid grid-cols-1 auto-rows-fr gap-2">
                    {/* //need to render one for each w/ restock value > their restock limit */}
                    {itemsToRestock.map(item => (  
                        <ItemFrame key={item.id} item={item}/>
                    ))}
                </div>
            </div>)}
            <div className='card' onClick={handleClear}>Clear All</div>
            <CSVUploader></CSVUploader>
        </div>
    )
}

export default Restock;