import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ItemFrame = ({item}) => {
    const { id, itemName, restockNeeded, totalItemQty, backstockLocation, itemPic, } = item;

    return (
        <Link to = {`/item/${id}`} key={id} item={item}>
    <div className="wrapper">
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
</Link>
  );
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

export default ItemFrame