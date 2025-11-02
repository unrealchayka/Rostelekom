import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export const useUserAvatar = () => {
  const user = useSession().data?.user
  const [src, setSrc] = useState('')
  useEffect(() => {
    if (user?.image) {
      setSrc(user?.image)
      return
    }

    const oauthAvatar = user?.image as string

    if (!oauthAvatar) {
      return
    }

    setSrc(oauthAvatar)
  }, [user?.image])

  return { src, alt: user?.name }
}