import { ToastContextProvider } from "../context"

export const useToast = (delay : number = 4000) => {
    const {dispatch} = ToastContextProvider()

    enum types {
        success,
        warning,
        error
    }

    const toast = (type: keyof typeof types, message: String) => {
        const id = Math.random().toString(36).substring(2, 9)
        dispatch({
            type: "ADD_TOAST",
            toast : {
                id,
                type,
                message
            }
        })

        setTimeout(() => {
            dispatch({
                type: "DELETE_TOAST",
                id
            })
        }, delay);
    }

    return toast
}