import api from './api';
import type { LoginDTO, AuthResponse } from '../types';

export const authService = {
  login: async (credentials: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};
