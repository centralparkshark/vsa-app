import { Link } from "react-router-dom"

const Cards = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
        <div className="restock card" style={{color: '#D31145', background: '#d5d5d5'}}>Item Reciever</div>
        <Link to='/inv'> 
            <div className="searchInventory card" style={{color: '#D31145', background: '#d5d5d5'}}>Search Inventory</div>
        </Link> 
        <div className="stickerRequest card" style={{color: '#D31145', background: '#d5d5d5'}}>Request Stickers</div>
        <div className="stickerRequest card" style={{color: '#D31145', background: '#d5d5d5'}}>Card #4</div>
        
    </div>
  )
}

export default Cards