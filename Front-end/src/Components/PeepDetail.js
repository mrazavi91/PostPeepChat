import React from 'react'
import './PeopleDetail.css'
import usePeepsContext from '../Hooks/UsePeepsContext.js'
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useUserContext } from '../Hooks/UseUserContext'

const PeepDetail = ({ peep }) => {
    const { dispatch } = usePeepsContext()
    const {user} = useUserContext()
    
    
    // delete for further improvement, only the person with same id can delete that post, needs more work
    const deleteHandler = async () => {

        //no logged in no deleting 
        if (!user) {
            return
        }

        await axios.delete(`http://localhost:9000/${peep._id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            data: {
                username: user.username
            }
        })
            .then((res) => {
                // console.log(res.data)
                dispatch({ type: 'DELETE_PEEP', payload: res.data })
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                }
            })
    }



    return (
        <div className='peep-detail'>
            <div className='detail'>
                <svg className= 'avatar'fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                <h4>{peep.userUsername}</h4>
                <p>{peep.text}</p>
            </div>
            <h5 className='date'>{formatDistanceToNow(new Date(peep.createdAt), { addSuffix: true })}</h5>
            {/* <span className="material-symbols-outlined" onClick={deleteHandler}>delete</span> */}
        </div>
    )
}

export default PeepDetail