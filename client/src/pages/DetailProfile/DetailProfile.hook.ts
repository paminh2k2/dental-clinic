import { useNavigate } from "react-router-dom"

export const useDetailProfile = () => {
    const nevagate = useNavigate()
    const handleBack = () => {
        
    }
    return {
        handleBack
    }
}