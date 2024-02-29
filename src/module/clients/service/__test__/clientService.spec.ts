import { describe, expect, test, jest } from '@jest/globals';
import { ClientsService } from '../ClientsService';
import { mockClientsRepository, mockClientsService, newClient } from '../../../../__tests__/mocks/clientMocks';

const clientsService = new ClientsService(mockClientsRepository);

describe('Clients Service', () => {

    test('should create a new client', async () => {
    
        const createNewClient = await clientsService.createClient(newClient);

        expect(mockClientsRepository.createClient).toHaveBeenCalledWith(newClient);
        expect(createNewClient).toEqual({
            "id": 5,
            "clientName": "Paula",
            "clientLastname": "Arce"
        });
      });
})