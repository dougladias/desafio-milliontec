import jwt from 'jsonwebtoken';
import { config } from '../config/env';

interface TokenPayload {
  username: string;
}

// Gera um token JWT com o payload fornecido
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwt.secret as jwt.Secret, {
    expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
  });
};

// Verifica e decodifica um token JWT
export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, config.jwt.secret as jwt.Secret) as TokenPayload;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};
