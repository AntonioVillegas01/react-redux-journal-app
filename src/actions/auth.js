import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';

import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { getSwalErr } from "../helpers/swal-util";
import { noteLogout } from "./notes.action";

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {
        dispatch( startLoading() )
        const auth = getAuth();
        signInWithEmailAndPassword( auth, email, password )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName ) )
                dispatch( finishLoading() )
                console.log( 'login correcto' )
            } ).catch( ({message}) => {
            console.log( {message})
            dispatch( finishLoading() )
            getSwalErr(message)
        } )

    }
}

export const login = ( uid, displayName ) => ( {
    type: types.login,
    payload: {
        uid,
        displayName
    }
} )

export const startLogout = () => {
    return async( dispatch ) => {

        const auth = getAuth();
        await signOut( auth )

        dispatch(logout())
        dispatch(noteLogout())
    }
}

export const logout = () => ( {
    type: types.logout
} )


export const startRegisterWithEmailPasswordName = ( { email, password, name } ) => {
    return ( dispatch ) => {
        const auth = getAuth();
        createUserWithEmailAndPassword( auth, email, password )
            .then( async( { user } ) => {
                await updateProfile( user, { displayName: name } )
                dispatch( login( user.uid, user.displayName ) )
            } ).catch( e => {
            getSwalErr(e)
        } )
    }
}


export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();
        signInWithPopup( auth, googleAuthProvider )
            .then( ( { user } ) => {
                console.log( user )
                dispatch( login( user.uid, user.displayName ) )
            } );
    }
}
