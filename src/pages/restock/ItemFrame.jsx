import PropTypes from 'prop-types'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase-config'
import { useState } from 'react'

const ItemFrame = ({item}) => {
//   //DOM refs
//   wrapper // holds everything
//   itemFrame //holds data
//   backgroundLeft // holds quick check  function
//   backgroundRight // holds edit function

    const { itemName, restockNeeded, totalItemQty, backstockLocation, itemPic, } = item
    const [visible, setVisible] = useState(true)

    const handleClick = async () => {
        
        //set restockNeeded to 0
        const itemRef = doc(db, 'inventory', item.id)
        //search database by id        
        try {
            await updateDoc(itemRef, {
                restockNeeded: 0,
            },
            setVisible(false)
            );
        } catch (error) {
            console.error('Error getting document: ', error)
        }    
    }



  return visible ? (
    <div className="wrapper" onClick={handleClick}>
        {/* <div className='backgroundLeft'>
            <span>Check</span>
        </div>
        <div className="backgroundRight">
            <span>Edit</span>
        </div> */}
        <div className="itemFrame box-2">
            <div className="leftInfo">
                {itemPic ? 
                <img src={itemPic} alt={itemName} /> : 
                <img src="https://picsum.photos/50" alt="randomly generated" />
                } 
                        <div className="itemInfo">
                            <h3 className="itemName">{itemName}</h3>
                            <h4 className="location">{backstockLocation}</h4>
                        </div>
                    </div>
                    <div className="rightInfo">
                        <div className="numNeededInfo">
                            <p>Restock Needed:</p>
                            <p>{restockNeeded}</p>
                        </div>
                        <div className="qtyInfo">
                            <p>Qty:</p>
                            <p>{totalItemQty}</p>
                        </div>
            </div>
        </div>
    </div>
  ) : null;
}

ItemFrame.propTypes = {
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

//To-Do: Use this to create a dragable cards eventually
//https://malcoded.com/posts/react-swipeable-list/
// constructor(props) {
//     super(props);

//     this.itemFrame = null;
//     this.wrapper = null;
//     this.backgroundLeft = null;
//     this.backgroundRight = null;

//     this.onMouseMove = this.onMouseMove.bind(this);
//     this.onTouchMove = this.onTouchMove.bind(this);
//     this.onDragStartMouse = this.onDragStartMouse.bind(this);
//     this.onDragStartTouch = this.onDragStartTouch.bind(this);
//     this.onDragEndMouse = this.onDragEndMouse.bind(this);
//     this.onDragEndTouch = this.onDragEndTouch.bind(this);
//     this.onDragEnd = this.onDragEnd.bind(this);
//     this.updatePosition = this.updatePosition.bind(this);
//     this.onSwiped= this.onSwiped.bind(this);
//   }


export default ItemFrame