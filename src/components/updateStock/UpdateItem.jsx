import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const updateItem = async (newInfo, oldInfo) => {
  const oldInfoId = oldInfo.id;
  const itemRef = doc(db, "inventory", oldInfoId)

  const newItemQty = parseInt(newInfo[12].replace(/,/g, ''));
  const oldRestockNum = parseInt(oldInfo.data().restockNeeded)
  //to-do: not sure that this logic is entirely correct
  const newRestockNum = oldRestockNum + parseInt(newInfo[5].replace(/,/g, ''));

  try {
    if (oldInfo.data().totalItemQty != newItemQty) {
      console.log("Successfully Updated", oldInfo.data().itemName)
      //update new itemqty and restock
      await updateDoc(itemRef, {
        totalItemQty: newItemQty,
        restockNeeded: newRestockNum,
      })
    }
} catch (error) {
    console.error('Error getting document: ', error)
}  

}
export default updateItem