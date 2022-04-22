
import { addDoc, collection, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

//react-journal

export const starNewNote = () => {
  return async ( dispatch, getState ) => {
    try {
      const uid = getState().auth.uid;
  
      const newNote = {
        title: '',
        body: '',
        date: new Date().getTime()
      }
  
      const docRef = await addDoc(collection( db, `${uid}/journal/notes`), newNote );
      dispatch( activeNotes( docRef.id, newNote ) );
      dispatch( addNewNote( docRef.id, newNote ) );
    } catch (error) {
      console.log(error);
    }
  }
}


export const activeNotes = (id,note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})


export const addNewNote = (id, note) =>({
  type: types.notesAddNew,
  payload: {
    id,
    ...note
  }
})

export const startLoadingNotes = (uid) => {
  return async ( dispatch) =>{
    try {
      const notes = await loadNotes(uid);
      dispatch( setNotes(notes) );
    } catch (error) {
      console.log(error);
    }
  }
}


export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote = (note) => {

  return async ( dispatch, getState ) => {
    
    try {

      const { uid } = getState().auth;
      
      if(!note.url){
        delete note.url;
      }
      
      const  noteToFirestore  = {...note};
      delete noteToFirestore.id

      const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
      await updateDoc(noteRef,noteToFirestore);

      dispatch( refreshNote( note.id,noteToFirestore) );
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Nota actualizada'
      })
    
    } catch (error) {
      Swal.fire('Error',error,'error');
      console.log(error);
    }
  }

}

export const refreshNote = ( id, note ) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
        id,
        ...note
    }
}
});


export const startUploading = (file) => {
  
  return async ( dispatch, getState ) => {

    const { activeNote } = getState().notes;

    Swal.fire({
      title: 'Subiendo imagen...',
      text: 'Espere por favor',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
          Swal.showLoading();
      }
    })

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch( startSaveNote(activeNote) );

    Swal.close();
  }
  
  
}


export const startDeleting = (id) => {

  return async ( dispatch, getState ) => {

    try {
      const { uid } = getState().auth;
  
      const noteRef = doc(db, `${uid}/journal/notes/${id}`);
      await deleteDoc(noteRef);
      dispatch( deleteNote(id) );
      
    } catch (error) {
      throw error;
    }


  }
}


export const deleteNote = (id) => ({
  type: types.notesDeleted,
  payload: id
})


export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
  payload: null
})