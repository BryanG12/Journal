import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PublicRoute = ({isAuth, children}) => {
  return isAuth ? <Navigate to='/' /> : children
}


PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
}