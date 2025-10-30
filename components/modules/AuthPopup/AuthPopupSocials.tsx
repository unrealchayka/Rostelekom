'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faGoogle,
  faVk,
  faYandex,
} from '@fortawesome/free-brands-svg-icons'
import { signIn } from 'next-auth/react'

const AuthPopupSocials = ({
}) => (
  <div className='cart-body__socials'>
    <button
      className='btn-reset socials__btn gh-color'
      onClick={() => {signIn('google', {callbackUrl: '/'})}}
    >
      <FontAwesomeIcon icon={faGithub} beat />
    </button>
    <button
      className='btn-reset socials__btn g-color'
      onClick={() => {signIn('google', {callbackUrl: '/'})}}
    >
      <FontAwesomeIcon icon={faGoogle} shake />
    </button>
    <button
      className='btn-reset socials__btn y-color'
      onClick={() => {signIn('google', {callbackUrl: '/'})}}
    >
      <FontAwesomeIcon icon={faYandex} bounce />
    </button>
    <button
      className='btn-reset socials__btn vk-color'
      onClick={() => {signIn('google', {callbackUrl: '/'})}}
    >
      <FontAwesomeIcon icon={faVk} shake />
    </button>
  </div>
)

export default AuthPopupSocials