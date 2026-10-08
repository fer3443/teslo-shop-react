import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand';
import { loginAction, registerActions } from '../actions';
import { checkAuthAction } from '../actions/check-auth';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  isAdmin: () => boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkoutStatus: () => Promise<boolean>;
  register: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: 'checking',
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin")
  },
  login: async (email: string, password: string) => {
    try {
      const result = await loginAction(email, password);
      localStorage.setItem('token-teslo', result.token);
      set({ user: result.user, token: result.token, authStatus: 'authenticated' })
      return true
    } catch (error) {
      localStorage.removeItem('token-teslo')
      set({ user: null, token: null, authStatus: 'not-authenticated' })
      return false
    }
  },
  logout: () => {
    localStorage.removeItem('token-teslo')
    set({ user: null, token: null, authStatus: 'not-authenticated' })
  },
  checkoutStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user, token, authStatus: 'authenticated' })
      return true
    } catch (error) {
      set({ user: null, token: null, authStatus: 'not-authenticated' })
      return false
    }
  },
  register: async (email: string, password: string, fullName: string) => {
    try {
      const { user, token } = await registerActions(email, password, fullName);
      localStorage.setItem('token-teslo', token)
      set({ user, token, authStatus: 'authenticated' })
      return true
    } catch (error) {
      localStorage.removeItem('token-teslo')
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false
    }
  }
}))