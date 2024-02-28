import { Request, Response } from 'express';
import { ClientsService } from "../service/ClientsService";
import { IClientsRepository } from '../infrastructure/repositories/IClientsRepository';
import { ValidationError } from "sequelize";

export class ClientsController {

    private clientsService: ClientsService;
    private clientsRepository: IClientsRepository;

    constructor(clientsService: ClientsService, clientsRepository: IClientsRepository) {
        this.clientsService = clientsService;
        this.clientsRepository = clientsRepository;
    }

    async createClient(req: Request, res: Response) {
        try {
            const newClient = await this.clientsService.createClient(req.body); 

            res.status(201).send(newClient); 

        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send(`Error adding new client: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
    async listClients(req: Request, res: Response) {
        try {
            const clients = await this.clientsRepository.findAllClients();
            res.status(200).send(clients);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(404).send(`Error getting clients: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
    async updateClient(req: Request, res: Response) {
        try {
            const clientId = req.params.id;

            const updatedClient = await this.clientsRepository.updateClient(clientId, req.body);
            
            res.send(updatedClient);

        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send(`Error updating client: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
    async deleteClient(req: Request, res: Response) {
        try {
            const clientId = req.params.id; 

            await this.clientsRepository.deleteClient(clientId);
            res.status(204).send("Ok");
        } catch (error) {
           
            if (error instanceof ValidationError) {
                res.status(400).send(`Error deleting client: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
}

export default ClientsController;