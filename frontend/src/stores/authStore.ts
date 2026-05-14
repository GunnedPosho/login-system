import { create } from 'zustand'
import api from '../lib/api'

interface User {
  id: string
  name: string
  email: string
  is_active: boolean
  is_verified: boolean
  created_at: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })
    const response = await api.post('/auth/login', { email, password })
    const { access_token, refresh_token, user } = response.data
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    set({ user, isAuthenticated: true, isLoading: false })
  },

  register: async (name, email, password) => {
    set({ isLoading: true })
    await api.post('/auth/register', { name, email, password })
    set({ isLoading: false })
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    set({ user: null, isAuthenticated: false })
  },
}))