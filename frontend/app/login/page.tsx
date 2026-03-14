'use client'

import { useState } from 'react'
import { login } from '@/lib/api'

export default function LoginPage() {
  const [username, setUsername] = useState('tester')
  const [password, setPassword] = useState('1234')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      const data = await login(username, password)
      localStorage.setItem('qa-user', JSON.stringify(data))
      setMessage(`Login success: ${data.displayName}`)
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
