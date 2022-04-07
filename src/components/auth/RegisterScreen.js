import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  return (
    <>
      <h3 className='auth__title'>Registrar</h3>

      <form>
        <input
          className='auth__input' 
          type="text"
          placeholder='Nombre'
          name='name'
          autoComplete='off'
        />
        <input
          className='auth__input' 
          type="text"
          placeholder='Email'
          name='email'
          autoComplete='off'
        />

        <input
          className='auth__input' 
          type="password"
          placeholder='Password'
          name='password'
        />

        <input
          className='auth__input' 
          type="password"
          placeholder='Confirmar Password'
          name='password2'
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
