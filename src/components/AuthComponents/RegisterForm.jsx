import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/actionCreators/authActionCreator';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [PasswordConfirmation, setPasswordConfirmation] = useState('')
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !PasswordConfirmation) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password != PasswordConfirmation) {
            toast.error("Password do not match");
            return;
        }

        dispatch(signUpUser(name, email, password, setSuccess));
    }


    React.useEffect(() => {
        if (success) {
            navigate("/dashboard");
        }
    }, [success])
    return (
        <form autoComplete='false' onSubmit={handleSubmit}>
            <div className='form-group my-2'>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }} />
            </div>

            <div className='form-group my-2'>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <div className='form-group my-2'>
                <input
                    type="text"
                    name="password"
                    className="form-control"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className='form-group my-2'>
                <input
                    type="password"
                    name="passwordConfirmation"
                    className="form-control"
                    placeholder='Re-Type Password'
                    value={PasswordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary my-2 form-control">Register</button>
        </form>
    )
}

export default RegisterForm