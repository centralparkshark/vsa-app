import { Link } from "react-router-dom"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase-config'
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";

const ItemPage = ({item}) => {
  const { id } = useParams();
  const [itemInfo, setItemInfo] = useState(null); 

useEffect(() => {

  async function fetchItemInfo() {
    if (!id) {
      console.error('Item ID is undefined');
      return;
    }

    const itemRef = doc(db, 'inventory', id);
    try {
            const docSnap = await getDoc(itemRef);
            if (docSnap.exists()) {
              const data = docSnap.data();  
              setItemInfo({
                id: docSnap.id,
                itemSKU: data.itemSKU,
                itemName: data.itemName,
                restockNeeded: data.restockNeeded,
                restockLimit: data.restockLimit,
                totalItemQty: data.totalItemQty,
                backstockLocation: data.backstockLocation,
                itemPic: data.itemPic,
                //to-do: figure out photo adding logic
              });
            }
        } catch (error) {
            console.error('Error getting document: ', error)
        }    
    }

    fetchItemInfo();
  }, [id]);

if (!itemInfo && !item) {
  return <div>Loading..</div>
}


ItemPage.propTypes = {
  item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      itemSKU: PropTypes.string,
      itemName: PropTypes.string,
      restockNeeded: PropTypes.number,
      restockLimit: PropTypes.number,
      totalItemQty: PropTypes.number,
      backstockLocation: PropTypes.array,
      itemPic: PropTypes.string,
  })
};


  return (
    <div className="bento flex">
        <Link to='/restock'><p>Back</p></Link>
        <div className="box items-center place-self-center min-w-[30vw] md:max-w-[40vw] max-w-[85vw]">
          {itemInfo.itemPic ? 
            <img className=" h-14" src={itemInfo.itemPic} alt={itemInfo.itemName} /> : 
            <img src="https://picsum.photos/50" alt="randomly generated" />
          } 
          <div className="itemName text-center font-extrabold text-2xl">{itemInfo.itemName}</div>
          <div className="inBackstock">In Backstock: {itemInfo.totalItemQty}</div>
          <div className="backstockLocation">Location: {itemInfo.backstockLocation}</div>
          
          <div className="qtyNeeded">Need: {itemInfo.restockNeeded}</div>
          <button className="">Got it!</button>
          <div className=" text-red-600">Can&apos;t find item?</div>
        </div>
    </div>
    )
 }


 export default ItemPage