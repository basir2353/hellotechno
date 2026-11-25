export type AuthUser = {
  name: string
  email: string
}

const STORAGE_KEY = 'hello-techno-auth'
const USERS_KEY = 'hello-techno-users'

type StoredUser = AuthUser & { password: string }

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredUser[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const user = JSON.parse(raw) as AuthUser
    if (!user?.email || !user?.name) return null
    return user
  } catch {
    return null
  }
}

export function setSession(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

export function signup(input: { name: string; email: string; password: string }): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (name.length < 2) return { ok: false, error: 'Enter your full name.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: 'Enter a valid email.' }
  if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' }

  const users = readUsers()
  if (users.some((u) => u.email === email)) return { ok: false, error: 'An account with this email already exists. Log in instead.' }

  const user: StoredUser = { name, email, password }
  writeUsers([...users, user])
  const session = { name, email }
  setSession(session)
  return { ok: true, user: session }
}

export function login(input: { email: string; password: string }): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const email = input.email.trim().toLowerCase()
  const password = input.password
  if (!email || !password) return { ok: false, error: 'Enter email and password.' }

  const users = readUsers()
  const found = users.find((u) => u.email === email)
  if (!found || found.password !== password) return { ok: false, error: 'Incorrect email or password.' }

  const session = { name: found.name, email: found.email }
  setSession(session)
  return { ok: true, user: session }
}
