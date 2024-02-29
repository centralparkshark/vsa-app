
const ItemFrame = () => {
  return (
    <div className="itemFrame box-2">
                    <div className="leftInfo">
                        <img src="https://picsum.photos/50" alt="" />
                        <div className="itemInfo">
                            <h3 className="itemName">Item Name</h3>
                            <h4 className="location">Location</h4>
                        </div>
                    </div>
                    <div className="qtyInfo">
                        <p>Qty:</p>
                        <p>34</p>
                    </div>
                </div>
  )
}

export default ItemFrame