import AddItemPopUp from "./AddItemPopUp";
import { Link } from "react-router-dom";
// import { db } from "../../firebase-config";
// import { collection, getDocs } from "firebase/firestore";

// const querySnapshot = await getDocs(collection(db, "inventory"))
// querySnapshot.forEach((doc) => {
//     console.log(doc.data())
// })

const Inventory = () => {
   
    
    
    
    return (
        <div className="bento">
            <Link to='/home'><p>Back</p></Link>

            <AddItemPopUp/>
        </div>
    )
}

export default Inventory;