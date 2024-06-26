import Papa from 'papaparse'
import { useState } from 'react';

import queryCollection from './QueryCollection';
import addNewItem from './AddNewItem';
import updateItem from './UpdateItem';

import MainButton from '../MainButton';
import { MdFileUpload } from "react-icons/md";


const CSVUploader = () => {
    //const [searchSKU, setSearchSKU] = useState(null)
    const [needUpload, setNeedUpload] = useState(true);
    
    const handleChange = (e) => {
    Papa.parse(e.target.files[0], {
        header: false,
        skipEmptyLines: true,
        complete: async function (results) {
          for (let i = 0; i < results.data.length; i++) {
            //check if sku exists in db
            const sku = (results.data[i][2])
            const foundItem = await queryCollection(sku);
                //if yes, update existing information
                if (foundItem) {
                    //do some fun funky math
                    let newInfo = results.data[i];
                    updateItem(newInfo, foundItem)

                } else {
                    const newItemInfo = {
                        itemName: results.data[i][0],
                        itemSKU: sku, // results.data[i][2]
                        totalItemQty: Number(results.data[i][12].replace(/,/g, '')),
                        restockNeeded: Number(results.data[i][5].replace(/,/g, '')),
                        restockLimit: 1,
                        backstockLocation: [],
                        itemPic: "",

                    }
                    addNewItem(newItemInfo) // add item to db
                   // do some funky math too!
                }
          }

        },
      });

      //say successfully uploaded
      //reset field 
      setNeedUpload(true)        
      
      //reload what needs restocked
      //to-do: reload once everything is updated
  }

  
const changeButton = () => {
    setNeedUpload(false)
    console.log('test')
  }

  if (needUpload)  {
    return (
        <MainButton onClick={changeButton} size="small">
          <MdFileUpload />
          Update Data
        </MainButton>
    )
  } else {
  return (
    <div className='bento'>
        <h3>Upload File:</h3>
        <p>*SKU Movement from yesterday</p>
        <input
        type = 'file'
        name = 'file'
        accept = '.csv'
        onChange={handleChange}
        />
    </div>
  )
  }
}

export default CSVUploader