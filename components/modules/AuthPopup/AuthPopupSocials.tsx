'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faGoogle,
  faVk,
  faYandex,
} from '@fortawesome/free-brands-svg-icons'
import { signIn } from 'next-auth/react'
import { setIsAuth } from '@/context/auth'

const socials = [
  {
    title: 'google',
    icon: <FontAwesomeIcon icon={faGithub} beat />,
    style: 'beat'
  },
  {
    title: 'google',
    icon: <FontAwesomeIcon icon={faGoogle} shake />
  },
  {
    title: 'google',
    icon: <FontAwesomeIcon icon={faYandex} bounce />
  },
  {
    title: 'google',
    icon: <FontAwesomeIcon icon={faVk} shake />
  },
]

const AuthPopupSocials = ({
}) => (
    <div className='cart-body__socials'>
      <button
        className='btn-reset socials__btn gh-color'
        onClick={() => { setIsAuth(true); signIn('google') }}
      >
        <FontAwesomeIcon icon={faGithub} beat />
      </button>
      <button
        className='btn-reset socials__btn g-color'
        onClick={() => { setIsAuth(true); signIn('google') }}
      >
        <FontAwesomeIcon icon={faGoogle} shake />
      </button>
      <button
        className='btn-reset socials__btn y-color'
        onClick={() => { setIsAuth(true); signIn('google') }}
      >
        <FontAwesomeIcon icon={faYandex} bounce />
      </button>
      <button
        className='btn-reset socials__btn vk-color'
        onClick={() => { setIsAuth(true); signIn('google') }}
      >
        <FontAwesomeIcon icon={faVk} shake />
      </button>
    </div>
)

export default AuthPopupSocials