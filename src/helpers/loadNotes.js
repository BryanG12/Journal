import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config"



export const loadNotes = async(uid) => {
  
  const noteSnap = await getDocs( collection(db,`${uid}/journal/notes`));
  const notes = [];
  noteSnap.forEach( doc => {
    notes.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return notes;
}