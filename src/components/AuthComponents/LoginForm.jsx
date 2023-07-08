import React, { useState } from 'react'
import { signInUser } from '../../redux/actionCreators/authActionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
     e.preventDefault();
     console.log(email,password)
     if(!email || !password){
        toast.error("Please fill in all fields");
        return;
     }

     dispatch(signInUser(email,password,setSuccess));

    }

    React.useEffect(() => {
        if (success) {
            navigate("/dashboard");
        }
    }, [success])
    return (
        <form  autoComplete="off" onSubmit={handleSubmit}>
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

            <button type="submit" className="btn btn-primary my-2 form-control">Login</button>
        </form>
    )
}

export default LoginForm