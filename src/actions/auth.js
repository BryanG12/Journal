import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { provider,app, db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';


export const startLoginEmailPassword = (email,password) => {


  return(dispatch) => {

    dispatch(startLoading());
    
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth,email,password)
    .then(({user}) => {
      console.log(user);
      dispatch( login( user.uid, user.displayName))
      dispatch(finishLoading());
    })
    .catch( error => {
      dispatch(finishLoading());
      console.log(error.message);
      // dispatch( loginError( error.message ))
    })
  }

}


export const startRegisterEmailPassword = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,password)
    .then(async({user}) => {
      await updateProfile(user,{displayName: name});

      dispatch(login(user.uid,user.displayName));

    })
    .catch(e => {
      console.log({e});
    })
  }
}


export const startGoogleLogin =()=>{
  return(dispatch)=>{
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then(({user}) => {

        dispatch(login(user.uid, user.displayName));


      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
  });
  }
}


export const login = ( uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
});


export const startLogout = () => {
  return async(dispatch) =>{
    const auth = getAuth();
    await signOut(auth)
    dispatch(logout());  
  }
};

export const logout =()=>({
  type: types.logout
})