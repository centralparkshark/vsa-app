import { useState } from "react";
import { Link } from 'react-router-dom';

import {doc, setDoc} from 'firebase/firestore'
import { db, auth } from "../../../firebase-config";

function Settings() {
    //gotta refix this changing system
    const [nameInput, setNameInput] = useState(""); //dont edit og state
    const [success, setSuccess] = useState("");
    
    const handleClick = () => {
      const user = auth.currentUser;
      if (user) {
        setDoc(doc(db, 'users', user.uid), {
            displayName: nameInput,
          }).then(() => {
            setSuccess('Succesfully changed!');
          }).catch((error) => {
            console.error("Error updating", error);
          });
      }
      setNameInput('')
    };

    const handleSignOut = () => {
      auth.signOut();
    }
    
    return (
        /*Settings Screen*/
        <div className="bento">
            <Link to='/home'><p>Back</p></Link>
            <h1 className="title">Settings</h1>
            <div className="box">
                <h4 style = {{color: "#4fbc4f"}}>{success}</h4>
                <label>Change Name:</label> 
                <input
                    type="text"
                    value={nameInput}
                    //want to set min input
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter new name"
                />
                <button onClick={handleClick}>Save</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
        //only setting it needs rn is name change and save button
        //dont know how to export name yet
    );
}

export default Settings;