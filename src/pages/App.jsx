import { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../firebase-config';
import useStore from './login/store';

import {Home, Settings, NoPage, Restock, Login, Inventory, ItemPage, ItemReceiver, Stickers} from '.'
import PublicOnlyRoute from './login/PublicOnlyRoute';
import PrivateRoute from './login/PrivateRoute';

function App() {
  //need to fix routing so it doesnt refresh to login screen
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
          <Route index element = {<PublicOnlyRoute Component={Login} />} />
          <Route path="/home" element = {<PrivateRoute Component={Home}/>}/>
          <Route path="/inv" element = {<PrivateRoute Component={Inventory}/>}/>
          <Route path="/restock" element = {<PrivateRoute Component={Restock}/>}/>
          <Route path="/item/:id" element = {<PrivateRoute Component={ItemPage}/>}/>
          
          <Route path="/receiver" element = {<PrivateRoute Component={ItemReceiver}/>}/>
          <Route path="/stickers" element = {<PrivateRoute Component={Stickers}/>}/>

          <Route path="/settings" element = {<PrivateRoute Component={Settings}/>}/>
          <Route path="*" element = {<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
