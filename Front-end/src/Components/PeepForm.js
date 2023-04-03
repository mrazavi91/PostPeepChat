import React, { useState } from 'react'
import axios from 'axios';
import './PeepForm.css';
import usePeepsContext  from '../Hooks/UsePeepsContext.js'
import { useUserContext } from '../Hooks/UseUserContext';

const PeepForm = () => {
    const { dispatch } = usePeepsContext()
    const { user } = useUserContext();

    const [text, setText] = useState();
    const [emptyPlace, setEmptyPlace] = useState([])
    const [error, setError] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()

        //no logged in no posting
        if (!user) {
            setError('You must be logged in')
            return
        }

        //sending this 
        const peep = { text }
        // post request 
        await axios.post("http://localhost:9000", peep, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
                }
            })
                .then((res) => {
                    dispatch({
                        type: 'CREATE_PEEP',
                        payload: res.data
                    })
                    setEmptyPlace([]);
                    setError('');
                })
                .catch(function(error){
                    if (error.response) {
                        console.log(error.response)
                        setError(error.response.data.error)
                        setEmptyPlace(error.response.data.empty)
                    }
            })
    }
        return (
            <form className='create' >
                <h2>Posting from here</h2>
                <label>Your post:</label>
                <input
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  className={emptyPlace.includes('text') ? 'error' : ''}
                />
                <input className='btn' type="submit" value="POST" onClick={submitHandler} />
                {error && <div className="error">{error}</div>}
            </form >
        )
    }


export default PeepForm