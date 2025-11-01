import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  // Cria um novo cliente
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, phone, address } = req.body;

      if (!name || !email || !phone || !address) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      // Chama o serviço para criar o cliente
      const client = await this.clientService.create({
        name,
        email,
        phone,
        address,
      });

      // Retorna o cliente criado
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof Error && error.message === 'Email já cadastrado') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro ao criar cliente' });
      }
    }
  };

  // Lista todos os clientes
  findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const clients = await this.clientService.findAll();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  };

  // Busca um cliente por ID  
  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const client = await this.clientService.findById(id);
      res.status(200).json(client);
    } catch (error) {
      if (error instanceof Error && error.message === 'Cliente não encontrado') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro ao buscar cliente' });
      }
    }
  };

  // Atualiza um cliente
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, email, phone, address } = req.body;

      if (!name || !email || !phone || !address) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      // Chama o serviço para atualizar o cliente
      const client = await this.clientService.update(id, {
        name,
        email,
        phone,
        address,
      });

      // Retorna o cliente atualizado
      res.status(200).json(client);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Cliente não encontrado') {
          res.status(404).json({ error: error.message });
        } else if (error.message === 'Email já cadastrado') {
          res.status(409).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Erro ao atualizar cliente' });
        }
      }
    }
  };

  // Deleta um cliente
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.clientService.delete(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === 'Cliente não encontrado') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro ao deletar cliente' });
      }
    }
  };
}
