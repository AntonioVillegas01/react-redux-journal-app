import { db } from "../firebase/firebase-config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { getSwalErr, getSwalSuccess } from "../helpers/swal-util";
import { fileUpload } from "../helpers/fileUpload";
import Swal from "sweetalert2";


export const startNewNote = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const docRef = await addDoc( collection( db, `${uid}/journal/notes` ), newNote )
            console.log(
                docRef.id, newNote
            );

            dispatch( activeNote( docRef.id, newNote ) )
            dispatch(addNewNote(docRef.id, newNote))

        } catch( e ) {
            console.log( e )
        }
    }
}

export const activeNote = ( id, note ) => ( {
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
} )

export const addNewNote = (id, note) => ({
    type:types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        // se cargan las notas al obtener el id del usuario
        const notes = await loadNotes( uid );
        // se llama el action  set Notes
        dispatch( setNotes( notes ) )
    }
}

export const setNotes = ( notes ) => ( {
    type: types.notesLoad,
    payload: notes
} )


export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        try {
            const { uid } = getState().auth

            if( !note.url ) {
                delete note.url
            }

            const noteToFirestore = { ...note };
            delete noteToFirestore.id

            const noteRef = await doc( db, `${uid}/journal/notes/${note.id}` )
            await updateDoc( noteRef, noteToFirestore )

            dispatch(refreshNote(note.id, noteToFirestore))
            await getSwalSuccess('The note was succesfully updated')

        } catch( e ) {
            console.log( e )
             getSwalErr('Something has failed :(')
        }

    }
}

export const refreshNote = ( id, note ) =>( {
    type: types.notesUpdated,
    payload:{
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = (file)   =>{
    return async (dispatch, getState)=> {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()    => {
                Swal.showLoading()
            }
        })

        const {active: activeNote} = getState().notes
        const fileUrl = await fileUpload(file)
        activeNote.url = fileUrl

        dispatch(startSaveNote(activeNote))

        Swal.close()
    }
}

export const startDeleting = ( id) => {
    return async (dispatch, getState) => {

        const { uid }  = getState().auth
        const noteRef = await doc( db, `${uid}/journal/notes/${id}` )
        await deleteDoc( noteRef )

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id)=>({
    type: types.notesDelete,
    payload: id
})


export const noteLogout = () =>( {
    type: types.notesLogoutCleaning
})
