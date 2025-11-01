export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClientDTO {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface UpdateClientDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface User {
  username: string;
}
