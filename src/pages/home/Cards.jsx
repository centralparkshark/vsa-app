import { Link } from "react-router-dom"

const Cards = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
        <Link to='/restock'> 
            <div className="restock card">Restock</div>
        </Link>
        <Link to='/inv'> 
            <div className="searchInventory card">Search Inventory</div>
        </Link> 
        <div className="stickerRequest card">Request Stickers</div>
        <div className="stickerRequest card">Card #4</div>
    </div>
  )
}

export default Cards