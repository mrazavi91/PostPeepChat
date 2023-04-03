import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PeepForm from '../Components/PeepForm.js'
import PeepDetail from '../Components/PeepDetail.js'
import './Home.css'
import usePeepsContext from '../Hooks/UsePeepsContext.js'
const Home = () => {
    const { peeps, dispatch } = usePeepsContext();
    // console.log('peeps',peeps)
    // const [peeps, setPeeps] = useState('')
    useEffect(() => {
        const fetchPeeps = async () => {
            const response = await axios.get('http://localhost:9000')
                .then(res => {
                    console.log(res.data)
                    //  setPeeps(res.data)
                    dispatch({
                        type: 'SET_PEEPS',
                        payload: res.data
                    })
                })
                .catch(err => console.log(err))

        }
        fetchPeeps()
    }, [dispatch])
    // console.log(peeps)
    return (
        <div className='home'>
            <div className='peeps'>
                {peeps && peeps.map(peep => (
                    <PeepDetail peep={peep} key={peep._id} />
                ))}
            </div>
            <PeepForm />
        </div>
    )
}

export default Home