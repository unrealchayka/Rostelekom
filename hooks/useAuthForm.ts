import { IInputs, ISignUpFx } from '@/types/authPopup'
import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useAuthForm = (
    initialSpinner: Store<boolean>,
    isSideActive: boolean,
    event: EventCallable<ISignUpFx>
) => {
    const spinner = useUnit(initialSpinner)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IInputs>()

    const session = useSession()
    const [userStatus, setUserStatus] = useState(session)
    const { data, status } = userStatus

    const generateUID = () => {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    };

    useEffect(() => {
        if (isSideActive && status === 'authenticated') {
            event({
                name: data?.user?.name ?? '',
                email: data?.user?.email ?? '',
                password: generateUID(),
                isOAuth: true,
            });
        }
    }, [isSideActive, status, data?.user, event]);

    return {
        spinner,
        register,
        errors,
        handleSubmit,
    }
}