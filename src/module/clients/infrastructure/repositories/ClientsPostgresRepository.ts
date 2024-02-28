import { IDbConnection } from "../../../../config/sequelizeConfig";
import { ClientsEntity } from "../../domain/ClientsEntity";
import { IClientsRepository } from "./IClientsRepository";

export function ClientsPostgresRepository(db: IDbConnection): IClientsRepository {
    
    return {
        async createClient(clientsEntity: ClientsEntity): Promise<ClientsEntity> {
            const newClient = {
                clientName: clientsEntity.clientName,
                clientLastname: clientsEntity.clientLastname
            };

            if (!newClient) throw new Error('The client could not be created');

            const createdClientModel = await db.models.ClientsModel.create(newClient);
            const createdClientEntity = ClientsEntity.fromDatabaseModel(createdClientModel);

            return createdClientEntity;
        },
        async findAllClients(): Promise<ClientsEntity[]> {
            const clients = await db.models.ClientsModel.findAll();
            const clientsEntities = clients.map(client => ClientsEntity.fromDatabaseModel(client));

            return clientsEntities;
        },
        async updateClient(clientId: string, clientsEntity: ClientsEntity): Promise<ClientsEntity> {
            if(!clientId) throw new Error('Id client can not be empty');

            const client = await db.models.ClientsModel.findByPk(clientId);

            if (!client) throw new Error('Client not found');

            await client.update(clientsEntity);

            const updatedClientEntity = ClientsEntity.fromDatabaseModel(await db.models.ClientsModel.findByPk(clientId));

            return updatedClientEntity;
        },
        async deleteClient(clientId: string): Promise<void> {
            if(!clientId) throw new Error('Id client can not be empty');
            
            const client = await db.models.ClientsModel.findByPk(clientId);

            if (!client) throw new Error('Client not found');

            await client.destroy();
        }
    };
}