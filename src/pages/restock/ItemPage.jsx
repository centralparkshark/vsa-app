import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const ItemPage = (props) => {
console.log(props)
console.log(props.itemName)
 return (
    
    <div className="bento">
        <Link to='/restock'><p>Back</p></Link>
        <div>{props.itemName}</div>
    </div>
  )
}

ItemPage.propTypes = {
    id: PropTypes.string,
    itemSKU: PropTypes.string,
    itemName: PropTypes.string,
    restockNeeded: PropTypes.number,
    totalItemQty: PropTypes.number,
    backstockLocation: PropTypes.array,
    itemPic: PropTypes.string,
}


export default ItemPage