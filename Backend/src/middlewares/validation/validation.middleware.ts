import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';


// Middleware de validação usando class-validator
export const validateDTO = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Transforma o body plain object em uma instância da classe DTO
      const dtoInstance = plainToInstance(dtoClass, req.body);

      // Valida a instância
      const errors: ValidationError[] = await validate(dtoInstance);

      if (errors.length > 0) {
        // Formata os erros de validação
        const formattedErrors = errors.map((error: ValidationError) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));

        res.status(400).json({
          error: 'Erro de validação',
          details: formattedErrors,
        });
        return;
      }

      // Substitui o body pela instância validada
      req.body = dtoInstance;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar validação' });
    }
  };
};
