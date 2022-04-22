import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNotes, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { activeNote } = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm( activeNote );
  const { title, body } = formValues;

  const activeId = useRef( activeNote.id );

  useEffect(() => {
    
    if( activeNote.id !== activeId.current ) {

      reset( activeNote );
      activeId.current = activeNote.id;
      
    }
  }, [activeNote, reset]);
  

  useEffect(() => {
    // if(formValues !== activeNote) {
      dispatch( activeNotes( formValues.id, { ...formValues } ) );
    // }
  },[formValues,dispatch]);

  const [inputFocus, setInputFocus]=useState(localStorage.getItem('lastInput' || 'title'));
  const handleFocus=(e)=>{
    setInputFocus(e.target.name)
    e.target.setSelectionRange(e.target.value.length, e.target.value.length)
    localStorage.setItem('lastInput', e.target.name);
  }

  const handleDeleteNote = () => {

    dispatch(startDeleting(formValues.id))
  }


  return (
    <div className='notes__main-content'>
      
      <NotesAppBar />

      <div className='notes__content'>
        <input
          type='text'
          placeholder='Anota algo...'
          className='notes__title-input'
          onFocus={handleFocus}  //llamada a la funcion
          autoComplete='off'
          name='title'
          value={title}
          onChange={handleInputChange}
          autoFocus={inputFocus === 'title' ? true : false }//cambio de foco con el estado
        />
        <textarea
          placeholder='Anota algo...'
          className='notes__textarea'
          onFocus={handleFocus}  //llamada a la funcion
          name='body'
          value={body}
          onChange={handleInputChange}
          autoFocus={inputFocus === 'body' ? true : false }//cambio de foco con el estado
        > </textarea>

        {
          activeNote.url &&
          <div className='notes__image'>
            <img
              src={activeNote.url}
              alt='Imagen'
            ></img>
          </div>
        }

      </div>
      <button
        className='btn btn-danger'
        onClick={ handleDeleteNote }

      >
        Borrar
      </button>

    </div>
  )
}
