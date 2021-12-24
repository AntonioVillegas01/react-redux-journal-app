import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import validator from "validator/es";

const LoginScreen = () => {

    const dispatch = useDispatch()
    const {loading, msgError} = useSelector( state=>state.ui);

    const [formValues, handleInputChange] = useForm( {
        email: 'marco@email.com',
        password: '123456'
    } )

    const { email, password } = formValues

    const handleLogin = ( e ) => {
        e.preventDefault()

        if(isFormValid()){
            dispatch(startLoginEmailPassword(email, password))
        }

    }

    const handleGoogleLogin =()=>{
        dispatch(startGoogleLogin())
    }

    const isFormValid = ()=>{

        if(email.trim().length === 0){
            dispatch( setError('name is required'))
            return false
        }else if(!validator.isEmail(email)){
            dispatch( setError('email is not valid'))
            return false
        }else if( password.length <5){
            dispatch( setError('Password should be at 6 character'))

            return false
        }

        dispatch(removeError())

        return true
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}
                  className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    (  <div className="auth__alert-error">
                        {msgError}
                    </div>)
                }

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
                <button type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                >
                    {loading ? 'Loading...' :'Login'}
                </button>
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div onClick={handleGoogleLogin}
                        className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon"
                                 src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                 alt="google button"/>
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link"
                      to="/auth/register">
                    Register
                </Link>
            </form>
        </>
    );
};

export default LoginScreen;
