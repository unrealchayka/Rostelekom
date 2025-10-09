'use client'
import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div style={{ padding: 50 }}>
      <h1>Ошибка авторизации</h1>
      <p>Код ошибки: {error}</p>
      <div>
        <h2>Возможные причины:</h2>
        <ul>
          <li>OAuth Consent Screen не опубликован</li>
          <li>Email не добавлен в test users</li>
          <li>Неверные Client ID/Secret</li>
          <li>Callback URL не совпадает</li>
        </ul>
      </div>
      <button onClick={() => window.history.back()}>Назад</button>
    </div>
  )
}