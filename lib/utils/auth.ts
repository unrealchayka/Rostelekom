import toast from "react-hot-toast"
import { handleCloseAuthPopup } from "./common"
import { setIsAuth } from "@/context/auth"

export const onAuthSuccess = <T>(message: string, data: T) => {
  localStorage.setItem('auth', JSON.stringify(data))
  toast.success(message)
  handleCloseAuthPopup()
  setIsAuth(true)
}

export const nameValidationRules = (
    message: string,
    requireMessage?: string
) => ({
    ...(requireMessage && { required: requireMessage }),
    pattern: {
        value: /^[A-Za-zА-Яа-яЁё]+$/,
        message,
    },
    minLength: {
        value: 2,
        message: 'Минимум 2 символа',
    },
    maxLength: {
        value: 15,
        message: 'Максимум 15 символов',
    },
})

export const emailValidationRules = (
    message: string,
    requireMessage?: string
) => ({
    ...(requireMessage && { required: requireMessage }),
    pattern: {
        value: /\S+@\S+\.\S+/,
        message,
    },
})