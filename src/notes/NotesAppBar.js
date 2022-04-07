import React from 'react'

export const NotesAppBar = () => {
  return (
    <div className='notes__appbar'>

      <span>31 de Marzo 2022</span>

      <div className='notes__appbar-actions'>
        <button className='btn'>
          Captura
        </button>
        <button className='btn'>
          Guardar
        </button>
      </div>


    </div>
  )
}
