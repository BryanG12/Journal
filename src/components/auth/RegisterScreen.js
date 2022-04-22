import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui'
import { startRegisterEmailPassword } from '../../actions/auth'
import Swal from 'sweetalert2'

export const RegisterScreen = () => {
  
  const dispatch = useDispatch();

  const {msgError} = useSelector( state => state.ui );


  const [ formValues, handleInputChange ] = useForm({
    name: 'Spike G12',
    email: 'spikeg12@gmail.com',
    password: '1234567',
    passwordConfirmation: '1234567'
  });

  const { name, email, password, passwordConfirmation } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterEmailPassword(email, password, name));
      // console.log('Register', name, email, password, passwordConfirmation);
    }
  }

  const isFormValid = () => {

    if( name.trim().length === 0 ){
      dispatch(setError('Name is required'));
      Swal.fire('Error', 'Name is required', 'error') 
      return  false; 
    }else if(!validator.isEmail(email)){
      dispatch(setError('Email is invalid'));
      Swal.fire('Error', 'Email is invalid', 'error') 
      return false;
    }else if(password !== passwordConfirmation || password.length <6){
      dispatch(setError('Password is invalid'));
      Swal.fire('Error', 'Password is invalid', 'error') 
      return false;
    }
    dispatch(removeError());
    return true;
    
  };

  // (msgError)&& Swal.fire('Error', msgError, 'error') 

  return (
    <>
      <h3 className='auth__title'>Registrar</h3>

      <form onSubmit={handleRegister} >

        
        {/* {msgError && (<div className='auth__alert-error'>{msgError}</div>)} */}

        <input
          className='auth__input' 
          type="text"
          placeholder='Nombre'
          name='name'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />
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

        <input
          className='auth__input' 
          type="password"
          placeholder='Confirmar Password'
          name='passwordConfirmation'
          value={passwordConfirmation}
          onChange={handleInputChange}
        />

        <button 
          className='btn btn-primary btn-block mb-5'
          type='submit'
        >
          Registar
        </button>

      
        <Link
          className='link'
          to='/auth/login'
        >
          Ya esta registrado?
        </Link>

      </form>
    </>
  )
}
