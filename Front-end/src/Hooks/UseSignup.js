import axios from "axios";
import { useState } from "react";
import { useUserContext } from "./UseUserContext";


export const useSignup = () => {

    const { dispatch } = useUserContext();

    //useState for loading and errors
    const [error, setError] = useState(null);
    const [isLoading, setIsLoadig] = useState(null);

    //signup async function
    const signup = async (name, email, username, password) => {

        //at first isLoading is true and no error
        setError(null)
        setIsLoadig(true)

        //fetching data using axios
        await axios.post('http://localhost:9000/signup', {
            name, email, username, password
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
            .catch(function (error) {
                if (error.response) {
                    setError(error.response.data.error)
                    setIsLoadig(false)
                }
            })
    }
    return { signup, isLoading, error }
}