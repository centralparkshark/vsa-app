import { Link } from "react-router-dom"

const Cards = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
        <Link to='/reciever'>
          <div className="restock card">Recieve Items</div>
        </Link>
        <Link to='/inv'> 
            <div className="searchInventory card">Search Inventory</div>
        </Link> 
        <Link to='/stickers'>
        <div className="stickerRequest card">Request Stickers</div>
        </Link>
        <div className="i card">Card #4</div>
        
    </div>
  )
}

export default Cards