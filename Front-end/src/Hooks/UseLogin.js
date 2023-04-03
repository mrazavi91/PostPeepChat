import axios from "axios";
import { useUserContext } from "./UseUserContext";
import { useState } from 'react'


export const useLogin = ()=> {
    
    //useState for loading and errors
    const [error, setError] = useState(null);
    const [isLoading, setIsLoadig] = useState(null);
    const { dispatch } = useUserContext()
    
    //login fucntion
    const login = async(email, password) => {
        setIsLoadig(true)
        setError(null)

        await axios.post('http://localhost:9000/login', {
            email,password
        })
            .then((res) => {
                //saving the user into local host
                localStorage.setItem('user', JSON.stringify(res.data))

                //updating he user context
                console.log(res.data)
                dispatch({ type: 'LOGIN', payload: res.data })
                console.log(res.data)

                //updating the loading state
                setIsLoadig(false)

               
        })
        .catch (function (error) {
            if (error.response) {
                setError(error.response.data.error)
                setIsLoadig(false)
            }
        })
    }
    return { login, isLoading, error }

}
