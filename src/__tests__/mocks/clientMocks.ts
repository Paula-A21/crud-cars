import { ClientsEntity } from "../../module/clients/domain/ClientsEntity";
import { IClientsRepository } from "../../module/clients/infrastructure/repositories/IClientsRepository";
import { ClientsService } from "../../module/clients/service/ClientsService";

export const listClients: ClientsEntity[] = [
	{
		id: 1,
		clientName: "Nahuel",
		clientLastname: "Romano"
	},
	{
		id: 2,
		clientName: "Abigail",
		clientLastname: "Paoli"
	},
	{
		id: 3,
		clientName: "Jacqueline",
		clientLastname: "Brousson"
	},
	{
		id: 4,
		clientName: "Carolina",
		clientLastname: "Garzón"
	}
]

export const newClient: ClientsEntity = {
	id: 5,
	clientName: "Paula",
    clientLastname: "Arce"
}

export const mockClientsRepository: IClientsRepository = {
	createClient: jest.fn(() => Promise.resolve({
		id: 5,
        clientName: "Paula",
        clientLastname: "Arce"
	})),
	findAllClients: jest.fn(() => Promise.resolve(listClients)),
	updateClient: jest.fn(() => Promise.resolve({
		id: 4,
        clientName: "Jeremías",
        clientLastname: "Flores"
	})),
	deleteClient: jest.fn(),
};

export const mockClientsService: jest.Mocked<ClientsService> = {
	clientsRepository: mockClientsRepository,
	createClient: jest.fn((clientsEntity: ClientsEntity) => Promise.resolve({
		id: 5,
        clientName: "Paula",
        clientLastname: "Arce"
	}))
};


