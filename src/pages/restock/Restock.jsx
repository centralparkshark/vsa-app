import { Link } from 'react-router-dom';
import './Restock.css';
import CSVUploader from '../../components/updateStock/CSVUploader';
import ItemFrame from './ItemFrame';

function Restock() {
    
    return (
        <div className="bento">
            <Link to='/home'><p>Back</p></Link>
            <CSVUploader></CSVUploader>
            <h1 className="title">Items Needed:</h1>
            <div className="bento p-0">
                {/* //need to render one for each w/ restock value > their restock limit */}
                <ItemFrame></ItemFrame>
                <ItemFrame></ItemFrame>
                <ItemFrame></ItemFrame>

            </div>

        </div>
    )
}

export default Restock;