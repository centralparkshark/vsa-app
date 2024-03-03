import PropTypes from 'prop-types'

const ItemFrame = ({itemName, restockNeeded, totalItemQty}) => {
  return (
    <div className="itemFrame box-2">
                    <div className="leftInfo">
                        <img src="https://picsum.photos/50" alt="" />
                        <div className="itemInfo">
                            <h3 className="itemName">{itemName}</h3>
                            <h4 className="location">Location</h4>
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
  )
}

ItemFrame.propTypes = {
    sku: PropTypes.string,
    itemName: PropTypes.string,
    restockNeeded: PropTypes.number,
    totalItemQty: PropTypes.number,

}

export default ItemFrame