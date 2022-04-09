import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BrowserRouter,Switch,Route} from 'react-router-dom'
import { login } from '../actions/auth'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'

export const AppRouter = () => {


  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    
    const auth = getAuth();
    onAuthStateChanged(auth,(user) =>{
      if(user?.uid){
        dispatch( login(user.uid,user.displayName) );
        setIsLoggedIn(true);
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
      <div>
        <Switch>
          <Route path='/auth'  component={AuthRouter} />
          <Route exact path='/'  component={JournalScreen} />
          <Redirect to='/auth' />

        </Switch>
      </div>
    </BrowserRouter>
  )
}
