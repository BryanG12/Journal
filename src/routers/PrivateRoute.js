import React from 'react'
import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

export const PrivateRoute = ({isAuth, children}) => {

  return isAuth ? children : <Navigate to="/auth/login" />

}
PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
}
