import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
        <div className="bg-gray-800 text-white w-64 flex-shrink-0">
            <Link to='/restock'> 
                <div className="restock">Restock</div>
            </Link>
            <Link to='/inv'> 
                <div className="searchInventory">Search Inventory</div>
            </Link> 
            <div className="stickerRequest">Request Stickers</div>
        </div>
  )
}

export default Sidebar