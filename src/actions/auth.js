import { types } from "../types/types";


export const startLoginEmailPassword = (email,password) => {

  return(dispatch) => {
    setTimeout(() => {
      dispatch( login( 123,'Bryan G12'))
      
    }, 3000);
  }

}



export const login = ( uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
});