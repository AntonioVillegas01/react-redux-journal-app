import React, { useEffect, useRef } from 'react';
import NotesAppBar from "./NotesAppBar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from "../../actions/notes.action";

const NoteScreen = () => {

    const { active: note } = useSelector( state => state.notes )
    const [formValues, handleInputChange, reset] = useForm( note )
    const { title, body, id } = formValues
    const activeId = useRef( note.id );
    const dispatch = useDispatch()


    const handleDelete = () =>{
        dispatch(startDeleting(id))
    }


    useEffect( () => {
        // si son diferentes necesito reset al form
        if( note.id !== activeId.current ) {
            reset( note )
            activeId.current = note.id
        }

    }, [reset] ); // [note,reset]

    // actualiza la nota
    useEffect( () => {
        dispatch( activeNote( formValues.id, { ...formValues } ) );
    }, [dispatch, formValues] )


    return (
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">
                <input type="text"
                       placeholder="Some awesome title"
                       className="notes__title-input"
                       autoComplete="off"
                       name="title"
                       value={title}
                       onChange={handleInputChange}
                />

                <textarea
                    className="notes__text-area"
                    placeholder="Whats ups"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                />

                {
                    ( note.url ) &&
                    ( <div className="notes__image">
                        <img src={note.url} alt="noteImage"/>
                    </div> )
                }

            </div>
            <button className="btn btn-danger " style={{padding: 30}}
                    onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default NoteScreen;
