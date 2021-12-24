import { types } from "../types/types";
import { addNewNote, deleteNote } from "../actions/notes.action";


const initalState = {
    notes: [],
    active: null
}


export const notesReducer = ( state = initalState, action ) => {
    // console.log('notesReducer called')
    switch( action.type ) {
        case  types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case  types.notesAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case types.notesLoad:
            // console.log( action.payload)
            return {
                ...state,
                notes: [...action.payload]
            }
        case types.notesUpdated:
            return {
                ...state,
                // modificar solamente la nota que se manda y se encuentra en el state
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
        default:
            return state
    }

}
