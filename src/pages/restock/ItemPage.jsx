import { Link } from "react-router-dom"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase-config'
import { useEffect } from "react";
import PropTypes from 'prop-types'

let itemInfo; 

const ItemPage = ({item}) => {
  async function fetchItemInfo() {
    const itemRef = doc(db, 'users', item.id)
        try {
            const docSnap = await getDoc(itemRef);
            if (docSnap.exists()) {
              const data = doc.data();  
              itemInfo = {
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
            }
        } catch (error) {
            console.error('Error getting document: ', error)
        }    
    }

useEffect(() => {
  fetchItemInfo();
}, []);

ItemPage.propTypes = {
  item: PropTypes.shape({
      id: PropTypes.string,
      itemSKU: PropTypes.string,
      itemName: PropTypes.string,
      restockNeeded: PropTypes.number,
      restockLimit: PropTypes.number,
      totalItemQty: PropTypes.number,
      backstockLocation: PropTypes.array,
      itemPic: PropTypes.string,
  })
}




  return (
    <div className="bento">
        <Link to='/restock'><p>Back</p></Link>
        <div className="box items-center">
          <div className="itemPic">Picture</div>
          <div className="itemName font-extrabold text-2xl">{itemInfo.itemName}</div>
          <div className="backstockLocation">Location: Bin 4C</div>
          <button className="">Got it!</button>
          <div className=" text-red-600">Can&apos;t find item?</div>
        </div>
    </div>
    )
 }


 export default ItemPage