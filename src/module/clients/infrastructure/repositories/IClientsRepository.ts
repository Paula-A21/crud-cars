import { ClientsEntity } from "../../domain/ClientsEntity";

export interface IClientsRepository {
    findAllClients(): Promise<ClientsEntity[]>; 
    createClient(clientsEntity: ClientsEntity): Promise<ClientsEntity>; 
    updateClient(clientId: string, clientsEntity: ClientsEntity): Promise<ClientsEntity>; 
    deleteClient(clientId: string): Promise<void>;
}