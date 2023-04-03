import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../Hooks/UseLogout'
import { useUserContext } from '../Hooks/UseUserContext'
import './Navbar.css'


const Navbar = () => {
    const { logout } = useLogout()
    const {user} = useUserContext()

    
    const handleClick =  () => {
        logout()
    }
    
    return (
        <header>
            <div className='navbar'>
                <Link to='/' className='logo'><h1 className='logo'>PostPeepChat</h1></Link>
                <nav id="nav-mobile" className="ul">
                    {user && (
                        <div>
                            <ul className='ul' >
                                <span className='welcome'>Welcome {user.username}!</span>
                                <button className='btn' onClick={handleClick}>Logout</button>
                            </ul>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <ul className='list'>
                                <li><Link to='/login' className='btn'>Log in</Link></li> 
                                <li><Link to='/signup' className='btn'>Sign up</Link></li>
                            </ul>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
