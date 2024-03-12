import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const ItemPage = (props) => {
 
 const { itemName, restockNeeded, totalItemQty, backstockLocation, itemPic } = item;
 
 console.log(itemName)
 return (
    
    <div className="bento">
        <Link to='/restock'><p>Back</p></Link>
        <div>{itemName}</div>
    </div>
  )
}

ItemPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      item: PropTypes.shape({
        itemName: PropTypes.string.isRequired,
        restockNeeded: PropTypes.number.isRequired,
        totalItemQty: PropTypes.number.isRequired,
        backstockLocation: PropTypes.string.isRequired,
        itemPic: PropTypes.string
      }).isRequired
    }).isRequired
  })
};

export default ItemPage