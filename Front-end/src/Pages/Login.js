import React from 'react'
import axios from 'axios';
import './Login.css';
import { useState } from 'react'
import { useLogin } from '../Hooks/UseLogin';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login, isLoading, error } = useLogin()
    
    const submitHandler = async (e) => {
        e.preventDefault()

        await login( email,password)
    }

    return (
        <div className='login'>
            <form onSubmit={submitHandler}>
                <h2 className='h2'>Login</h2>

                <label className='label'>Email:</label>
                <input className='input' type="email" placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className='label'>Password:</label>
                <input className='input' type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className='btn' disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
            </form>

            <div className='Loggedin'>
                <Link to='/signup'>Don't have an account? Sign up</Link>
            </div>
        </div>
  )
}

export default Login