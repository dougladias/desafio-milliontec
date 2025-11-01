import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateClientDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(3, 255, { message: 'Nome deve ter entre 3 e 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @Length(5, 255, { message: 'E-mail deve ter entre 5 e 255 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'Telefone deve ser uma string' })
  @Matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
    message: 'Telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
  })
  phone: string;

  @IsNotEmpty({ message: 'E ndereço é obrigatório' })
  @IsString({ message: 'Endereço deve ser uma string' })
  @Length(5, 500, { message: 'Endereço deve ter entre 5 e 500 caracteres' })
  address: string;
}
