import { useState } from "react";
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const [values, SetValues] = useState(initialState);

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
                <h3>Login</h3>

                {/* name field */ }
                <div className='form-row'>
                    <label
                        htmlFor='name'
                        className='form-label'
                    >
                        name
                    </label>

                    <input
                        type='text'
                        value={ values.name }
                        name='name'
                        onChange={ handleChange }
                        className='form-input'
                    />
                </div>

                <button
                    type='submit'
                    className='btn btn-block'
                >
                    submit
                </button>
            </form>
        </Wrapper>
    );
};

export default Register;