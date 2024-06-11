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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            //setIsLoading(true)
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
                setIsLoading(false)
            } catch (error) {
                console.error('Error retrieving items:', error);
                setIsLoading(false)
            }
        };
    
        fetchData();
    }, []);

    const handleClear = () => {
        //To-Do set restock 0
    }
    
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="bento">
            <Link to='/home'><p>Back</p></Link>
            {itemFrames.length === 0 && <div className="f text-center bg-red-800">All items collected!</div>}
            {itemFrames.length > 0 && (<div>
                <h1 className="title">Items Needed:</h1>
                <div className="bento p-0">
                    {/* //need to render one for each w/ restock value > their restock limit */}
                    {itemFrames.map(item => (  
                        <ItemFrame key={item.id} item={item}/>
                    ))}
                </div>
            </div>)}
<div className='card ' onClick={handleClear}>Clear All</div>
            <CSVUploader></CSVUploader>

        </div>
    )
}

export default Restock;