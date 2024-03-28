import { Link } from "react-router-dom"

const ItemReceiver = () => {
  return (
    <div className="bento">
        <Link to='/home'><p>Back</p></Link>
        <div>Items!</div>
    </div>
  )
}

export default ItemReceiver