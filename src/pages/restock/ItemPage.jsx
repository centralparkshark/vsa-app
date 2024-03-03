import { Link } from "react-router-dom"

const ItemPage = () => {
  return (
    
    <div className="bento">
        <Link to='/restock'><p>Back</p></Link>
        <div>Item Page</div>
    </div>
  )
}

export default ItemPage