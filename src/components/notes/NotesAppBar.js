import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
  
  const dispatch = useDispatch();
  const {activeNote}= useSelector(state => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(activeNote));
  }

  const handlePictureClick = () => {
    document.getElementById('fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){
      dispatch(startUploading(file));
    }
  }

  return (
    <div className='notes__appbar'>

      <span>31 de Marzo 2022</span>

      <input
        type='file'
        name='file'
        id='fileSelector'
        style={{display: 'none'}}
        onChange = { handleFileChange }
      />

      <div className='notes__appbar-actions'>
        <button 
          className='btn'
          onClick={handlePictureClick}
        >
          Captura
        </button>
        <button 
          className='btn'
          onClick = { handleSave}
        >
          Guardar
        </button>
      </div>


    </div>
  )
}
