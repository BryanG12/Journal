import React from 'react'

export const NothingSelected = () => {
  return (
    <div className='nothing__main-content'>
      <p>
        Seleccione un elemento de la lista para ver su contenido.
        <br/>
        crear un nuevo elemento
      </p>
      <i className='far fa-star fa-4x mt-5'></i>
    </div>
  )
}
