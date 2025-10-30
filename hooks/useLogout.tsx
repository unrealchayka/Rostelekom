import { useRouter } from 'next/navigation'
import { setIsAuth } from '@/context/auth'
import { signOut } from 'next-auth/react'

export const useUserLogout = () => {
  const router = useRouter()

  return () => {
    signOut({ redirect: true, callbackUrl: '/' })
    localStorage.removeItem('auth')
    setIsAuth(false)
    router.push('/')
  }
}