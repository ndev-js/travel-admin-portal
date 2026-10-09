import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthUser {
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
}

const initialState: AuthState = { isAuthenticated: false, user: null }

// Placeholder session: nothing is verified. Replace these reducers with real login/logout thunks once the backend exists.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer
