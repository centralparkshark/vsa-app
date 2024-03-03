import { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../firebase-config';
import useStore from './login/store';

import {Home, Settings, NoPage, Restock, Login, Inventory} from '.'
import PublicOnlyRoute from '../components/PublicOnlyRoute';
import PrivateRoute from '../components/PrivateRoute';

function App() {
  const {setLoginStatus} = useStore();
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user)=> {
      setLoginStatus(!!user)
    });

    return () => unsub(); 
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element = {<PublicOnlyRoute Component={Login} />} />
          <Route path="/home" element = {<PrivateRoute Component={Home}/>}/>
          <Route path="/inv" element = {<PrivateRoute Component={Inventory}/>}/>
          <Route path="/restock" element = {<PrivateRoute Component={Restock}/>}/>
          <Route path="/settings" element = {<PrivateRoute Component={Settings}/>}/>
          <Route path="*" element = {<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
