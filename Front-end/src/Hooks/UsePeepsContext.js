
import { PeepsContext } from "../context/PeepContext.js"
import { useContext } from "react"

const usePeepsContext = () => {
    const context = useContext(PeepsContext)

    if (!context) {
        throw Error('usePeepsContext should be implemented inside PeepsContextProvider')
    }

    return context
}

export default usePeepsContext
