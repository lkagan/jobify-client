import { useState, useEffect } from "react";
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo';
import { Alert, FormRow } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate();

    const {
        isLoading,
        showAlert,
        displayAlert,
        hideAlert,
        setupUser,
        user
    } = useAppContext();

    const toggleIsMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        const currentUser = { name, email, password };

        if (!email || !password || (!isMember && !name)) {
            return displayAlert();
        }

        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login successful.  Redirecting...'
            });
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User created.  Redirecting...'
            });
        }
    }

    useEffect(() => {
        if (user) {
            // Wait for success message to show and then hide.
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [user, navigate])

    return (
        <Wrapper className='full-page'>
            <form
                className='form'
                onSubmit={ onSubmit }
            >
                <Logo/>
                <h3>{ values.isMember ? 'Login' : 'Register' }</h3>
                { showAlert && <Alert message={ "testing" }/> }
                {/* name field */ }
                { !values.isMember && <FormRow
                    name={ "name" }
                    value={ values.name }
                    type={ "text" }
                    handleChange={ handleChange }
                />
                }
                <FormRow
                    name={ "email" }
                    value={ values.email }
                    type={ "text" }
                    handleChange={ handleChange }
                />
                <FormRow
                    name={ "password" }
                    value={ values.password }
                    type={ "password" }
                    handleChange={ handleChange }
                />
                <button
                    type='submit'
                    className='btn btn-block'
                    disabled={ isLoading }
                >
                    submit
                </button>
                <p>
                    { values.isMember ? 'Not a member yet?' : 'Already a member?' }
                    <button
                        type="button"
                        onClick={ toggleIsMember }
                        className="member-btn"
                    >
                        { values.isMember ? 'Register' : 'Login' }
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;