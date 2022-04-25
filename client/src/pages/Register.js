import { useState } from "react";
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo';
import { Alert, FormRow } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const {isLoading, showAlert} = useAppContext();

    const toggleIsMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    }

    const handleChange = (e) => {
        console.log(e.target);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

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