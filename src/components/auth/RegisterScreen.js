import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import validator from "validator/es";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector( state=>state.ui);
    console.log(msgError)

    const [formValues, handleInputChange] = useForm( {
        name: 'Marco',
        email: 'marco@email.com',
        password: '123456',
        password2: '123456'
    } )
    const { name, email, password, password2 } = formValues

    const handleRegister = ( e ) => {
        e.preventDefault()

        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName( { email, password, name }))
        }

    }

    const isFormValid = ()=>{

        if(name.trim().length === 0){
            dispatch( setError('name is required'))
            return false
        }else if(!validator.isEmail(email)){
            dispatch( setError('email is not valid'))
            return false
        }else if(password !== password2 || password.length <5){
            dispatch( setError('Password should be at 6 character and match each other'))

            return false
        }

        dispatch(removeError())

        return true
    }

    return (
        <>
            <h3 className="auth__title">Register </h3>

            <form onSubmit={handleRegister}
                  className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                  (  <div className="auth__alert-error">
                      {msgError}
                    </div>)
                }

                <input type="text"
                       placeholder="Name"
                       name="name"
                       className="auth__input"
                       autoComplete="off"
                       value={name}
                       onChange={handleInputChange}
                />

                <input type="text"
                       placeholder="Email"
                       name="email"
                       className="auth__input"
                       autoComplete="off"
                       value={email}
                       onChange={handleInputChange}
                />
                <input type="password"
                       placeholder="Password"
                       name="password"
                       className="auth__input"
                       value={password}
                       onChange={handleInputChange}
                />
                <input type="password"
                       placeholder="Confirm Password"
                       name="password2"
                       className="auth__input"
                       value={password2}
                       onChange={handleInputChange}
                />
                <button type="submit"
                        className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                <br/> <br/>
                <Link className="link mb-5"
                      to="/auth/login">
                    Back to Login
                </Link>
            </form>
        </>
    );
};

export default RegisterScreen;
