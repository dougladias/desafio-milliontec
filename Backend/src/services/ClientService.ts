import { Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { Client } from '../entities/Client';
import { ClientDTO } from '../types/interfaces';

// Serviço para gerenciar operações relacionadas a clientes
export class ClientService {
  private clientRepository: Repository<Client>;

  constructor() {
    this.clientRepository = AppDataSource.getRepository(Client);
  }

  // Cria um novo cliente
  async create(data: ClientDTO): Promise<Client> {
    // Verifica se email já existe
    const existingClient = await this.clientRepository.findOne({
      where: { email: data.email },
    });

    if (existingClient) {
      throw new Error('Email já cadastrado');
    }

    const client = this.clientRepository.create(data);
    return await this.clientRepository.save(client);
  }

  // Lista todos os clientes
  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Busca um cliente por ID
  async findById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return client;
  }

  // Atualiza um cliente
  async update(id: string, data: ClientDTO): Promise<Client> {
    const client = await this.findById(id);

    // Verifica se o email já está em uso por outro cliente
    if (data.email !== client.email) {
      const existingClient = await this.clientRepository.findOne({
        where: { email: data.email },
      });

      if (existingClient) {
        throw new Error('Email já cadastrado');
      }
    }
    
    Object.assign(client, data);
    return await this.clientRepository.save(client);
  }

  // Remove um cliente
  async delete(id: string): Promise<void> {
    const client = await this.findById(id);
    await this.clientRepository.remove(client);
  }
}
