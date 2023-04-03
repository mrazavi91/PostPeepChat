import axios from 'axios';
import './Signup.css';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useSignup } from '../Hooks/UseSignup';

const Signup = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const { signup, isLoading, error } = useSignup();
    
    console.log(error)
    
    const submitHandler = async (e) => {
        e.preventDefault();

        //using the signup function from useSignup
        await signup(name, email, username, password)

    }

    return (
        <div className='signup'>
            <form onSubmit={submitHandler}>
                <h2 className='h2'>Sign up</h2>

                <label className='label'>Name:</label>
                <input className='input' type="text" placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} />


                <label className='label'>Email:</label>
                <input className='input' type="email" placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        

                <label className='label'>Username:</label>
                <input className='input' type="text" placeholder='Username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />


                <label className='label'>Password:</label>
                <input className='input' type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className='btn' disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>

            <div className='Loggedin'>
                <Link to='/login'>Already have an account? Log in</Link>
            </div>
        </div>
        
       
    )
}

export default Signup