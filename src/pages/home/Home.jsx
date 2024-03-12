import cog from './settingsCog.svg';
import hhclogo from '../../assets/hhclogo.png';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase-config';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import SectionFocus from './SectionFocus'
import TaskList from './TaskList';
import Cards from './Cards';
import Sidebar from './Sidebar';

let restockNum = 23; //to-do: need to get from backend logic


let navBar;
//to-do: have this change on resize?
function screenSize(width) {
    if (width.matches) { //less than 60em
        navBar = <Cards />
    } else {
        //TO-DO: change to render sidebar
        navBar = <Cards /> 
        // navBar = <Sidebar />
    }
}

var width = window.matchMedia("(max-width: 60em)")



function Home() {
    screenSize(width);

    const current =  new Date();
    const month = current.toLocaleString('default', { month: 'long' });
    const today = `${month} ${current.getDate()}, ${current.getFullYear()}`;

    const [displayName, setDisplayName] = useState(null)

    useEffect(() => {
        fetchDisplayName();
    }, []);

    async function fetchDisplayName() {
        const user = auth.currentUser
        if (user) {
            const userRef = doc(db, 'users', user.uid)
            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setDisplayName(docSnap.data().displayName);
                }
            } catch (error) {
                console.error('Error getting document: ', error)
            }    
        }
    }
    
    if (displayName === null) {
        return <Loading />
    }

   return (
    <div className='bento flex w-full'>
        <div className='date--box flex justify-between gap-5 text-3xl'>
                <h3 className="date text-2xl font-medium">{today}</h3>
                <Link to='/settings'>
                    <img src={cog} alt="Settings Cog" style={{height: "auto"}}/>
                </Link> 
            </div>
        <h1 className="hello text-5xl font-thin">
            Hi, <br/> {displayName}!
        </h1>
            
        <div className="box">
            <SectionFocus />
        </div>
        {/*TO-DO: make a working to-do list section*/}
        <div className="box">
            <TaskList />
        </div>
        
        

        {/*TO-DO: only generate either of these if not zero */}
        {/*TO-DO: have restock num actually generate*/}
        <div className='box restock items-center'>
                {restockNum > 1 ? <h2>{restockNum} items needed</h2> : 
                restockNum === 1 && <h2>{restockNum} item needed</h2>}

            <Link to='/restock'> 
                <button className="restock--button px-4 py-1 text-3xl">Restock</button>
            </Link> 

            {/*To-DO: Link to online pull numbers and fix link*/}
            {restockNum > 1 ? <h2>{restockNum} items needed</h2> : 
                restockNum === 1 && <h2>{restockNum} item needed</h2>}
            <Link to=''> 
                <button className="online--button px-4 py-1 text-3xl">Online Pull</button>
            </Link> 
            {/*TO-DO: make inv part of a bar at the bottom*/}
            
        </div>
        <div>{navBar}</div>
        <div className='center flex justify-center'>
            <img className="logo h-16 w-16" alt="Heinz History Center Cog Logo" src={hhclogo} />
        </div>
        
    </div>
   )
}

export default Home;