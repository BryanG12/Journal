import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { useDispatch } from 'react-redux'

import { login } from '../actions/auth'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {


  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true); // si esta auntenticado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    
    const auth = getAuth();
    onAuthStateChanged(auth, async(user) =>{
      if(user?.uid){
        dispatch( login(user.uid,user.displayName) );
        setIsLoggedIn(true);
        //ya autenticado
        
        dispatch(startLoadingNotes(user.uid));
      }else{
        setIsLoggedIn(false);
      }
      setChecking(false);
    }) 
  }, [  dispatch, setIsLoggedIn,setChecking ]);
  
  

  if(checking){
    return <div>Espere Por favor...</div>
  }

  return (
    
    <BrowserRouter>
  
      <Routes>
        <Route path='/*'  element={
          <PublicRoute isAuth={isLoggedIn}>
            <AuthRouter />
          </PublicRoute>
        } 
        />
        <Route path='/'  element={
          <PrivateRoute isAuth={isLoggedIn}>
            <JournalScreen  />
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>

  )
}
