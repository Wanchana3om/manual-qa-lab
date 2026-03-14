'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { login } from '@/lib/api'
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('tester')
  const [password, setPassword] = useState('1234')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      const data = await login(username, password)
      localStorage.setItem('qa-user', JSON.stringify(data))
      document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}; path=/; max-age=604800; samesite=lax`
      setMessage(`Login success: ${data.displayName}`)
      router.push(searchParams.get('next') || '/shop')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed')
    }
  }

  return (
    <div className="card" style={{ maxWidth: 480 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="grid" style={{ gap: 12 }}>
        <div>
          <label>Username</label>
          <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn" type="submit">Login</button>
      </form>
      {!!message && <p className="muted">{message}</p>}
    </div>
  )
}
