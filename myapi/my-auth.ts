import { onAuthSuccess } from "@/lib/utils/auth"
import { ISignUpFx } from "@/types/authPopup"
import { createEffect } from "effector"
import api from './apiInstance'
import toast from "react-hot-toast"

export const oauthFx = createEffect(
    async ({ name, password, email }: ISignUpFx) => {
        try {
            const { data } = await api.post('/api/users/oauth', {
                name,
                password,
                email,
            })

            await api.post('/api/users/email', {
                password,
                email,
            })

            onAuthSuccess('АВТОРИЗАЦИЯ ВЫПОЛНЕНА', data)
            return data.user
        } catch (error) {
            toast.error((error as Error).message)
            return { error: true, message: (error as Error).message }
        }
    }
)

export const signUpFx = createEffect(
    async ({ name, password, email, isOAuth }: ISignUpFx) => {
        if (isOAuth) {
            await oauthFx({
                email,
                password,
                name,
            });
            return;
        }

        const { data } = await api.post('/api/users/signup', {
            name,
            password,
            email,
        })
        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }
        onAuthSuccess('Регистрация прошла успешно!', data)
        return data
    }
)

export const signInFx = createEffect(async ({ email, password, isOAuth }: ISignUpFx) => {
    if (isOAuth) {
        await oauthFx({
            email,
            password,
        });
        return;
    }
    const { data } = await api.post('/api/users/login', {
        email,
        password,
    })

    if (data.warningMessage) {
        toast.error(data.warningMessage)
        return
    }

    onAuthSuccess('ВХОД ВЫПОЛНЕН!', data)

    return data
})