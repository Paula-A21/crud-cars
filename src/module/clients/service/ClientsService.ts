import { ClientsEntity } from "../domain/ClientsEntity";
import { IClientsRepository } from "../infrastructure/repositories/IClientsRepository";

export class ClientsService {
    public constructor(public readonly clientsRepository: IClientsRepository) { }

    public async createClient(clientsEntity: ClientsEntity): Promise<ClientsEntity> {
        return await this.clientsRepository.createClient(clientsEntity);
    }
}