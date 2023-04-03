import { useUserContext } from "./UseUserContext.js";

export const useLogout = () => {
    const { dispatch } = useUserContext();

    const logout = () => {
        localStorage.removeItem('user')

        //UPDATING 
        dispatch({ type: 'LOGOUT' })
    }
    
    return {logout}
}