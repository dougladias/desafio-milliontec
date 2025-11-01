import { IsNotEmpty, IsString, Length } from 'class-validator';

// DTO para login de usuário
export class LoginDTO {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  @IsString({ message: 'Username deve ser uma string' })
  @Length(4, 50, { message: 'Username deve ter entre 4 e 50 caracteres' })
  username: string;

  @IsNotEmpty({ message: 'Password é obrigatório' })
  @IsString({ message: 'Password deve ser uma string' })
  @Length(4, 50, { message: 'Password deve ter entre 4 e 50 caracteres' })
  password: string;
}
