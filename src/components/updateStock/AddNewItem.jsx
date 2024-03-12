import { db } from "../../../firebase-config";
import { doc, setDoc } from 'firebase/firestore';

const addNewItem = async (newItemInfo) => {
    await setDoc(doc(db, "inventory", newItemInfo.itemSKU), newItemInfo);
    console.log("Successfully Added", newItemInfo.itemName)
}

export default addNewItem