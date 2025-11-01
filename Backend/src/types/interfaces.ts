// Interface para dados de login
export interface LoginDTO {
  username: string;
  password: string;
}

// Interface para criar/atualizar cliente
export interface ClientDTO {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Interface para resposta de autenticação
export interface AuthResponse {
  token: string;
  user: {
    username: string;
  };
}
