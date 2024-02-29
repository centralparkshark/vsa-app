import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

const queryCollection = async (sku) => {
    const collectionRef = collection(db, "inventory") //reference the db collection
    const q = query(collectionRef, where("itemSKU", '==', sku)) //creates search          
    
    try {
        const querySnapshot = await getDocs(q);
        let foundItem = null;
        querySnapshot.forEach((doc) => {
            foundItem = doc
        })
        return foundItem;
    } catch (error) {
        console.error("Error getting documents: ", error)
        return null;
    }
} 

export default queryCollection