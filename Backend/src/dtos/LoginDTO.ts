import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  @IsString({ message: 'Username deve ser uma string' })
  @Length(3, 50, { message: 'Username deve ter entre 3 e 50 caracteres' })
  username: string;

  @IsNotEmpty({ message: 'Password é obrigatório' })
  @IsString({ message: 'Password deve ser uma string' })
  @Length(3, 100, { message: 'Password deve ter entre 3 e 100 caracteres' })
  password: string;
}
