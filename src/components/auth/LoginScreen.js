import React from 'react'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import validator from 'validator'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const {msgError,isLoading} = useSelector( state => state.ui );

  const [formValues, handleInputChange] = useForm ({
    email: 'spikeg12@gmail.com',
    password: '1234567'
  });

  const { email, password  } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if(validatorLogin()){

      dispatch(startLoginEmailPassword(email, password));
    }

  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }

  const validatorLogin = () => {
    
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is invalid'));
      Swal.fire('Error', 'Email is invalid', 'error') 
      return false;
    }
    if (password.trim().length <6) {
      dispatch(setError('Password is invalid'));
      Swal.fire('Error', 'Password is invalid', 'error') 
      return false;
    }
    return true;
  }
  
  // msgError && Swal.fire('Error', msgError, 'error') 

  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form onSubmit={handleLogin}>
        {/* { msgError && <div className='auth__alert-error'>{msgError}</div> } */}

        <input
          className='auth__input' 
          type="text"
          placeholder='Email'
          name='email'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
          />

        <input
          className='auth__input' 
          type="password"
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />

        <button 
          className='btn btn-primary btn-block'
          type='submit'
          disabled={isLoading}
        >
          Login
        </button>

        <div className='auth__social-networks'>
          <p>Login Whit Social networks</p>
          <div 
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link
          className='link'
          to='/auth/register'
        >
          Create new account
        </Link>

      </form>
    </>
  )
}
