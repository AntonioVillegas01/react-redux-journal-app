import { db } from "../firebase/firebase-config";
import { collection, getDocs, query } from "@firebase/firestore"


export const loadNotes =  async (uid, ) =>{

    const notesSnap = await getDocs(query(collection(db, `${ uid }/journal/notes`)));
    const notes = [];
    // console.log(notesSnap)
    notesSnap.forEach( snapChildren => {
       notes.push({
           id: snapChildren.id,
           ...snapChildren.data()
       })
    });

    // console.log(notes)


   return notes;
}
