import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const itemsInDb = collection(db, "inventory");

const addNewItem = (newItemInfo) => {
    addDoc(itemsInDb, newItemInfo)
    console.log("Successfully Added", newItemInfo.itemName)
}

export default addNewItem