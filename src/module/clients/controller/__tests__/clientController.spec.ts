import { describe, expect, test, jest } from '@jest/globals';
import { ClientsController } from "../ClientsController";
import { Request, Response } from 'express';
import { mockClientsRepository, mockClientsService, listClients } from '../../../../__tests__/mocks/clientMocks';

const req = {} as Request;
const res: Response = {} as unknown as Response;

const sendMock = jest.fn();
const statusMock = jest.fn().mockReturnValue({ send: sendMock });
(res.status as any) = statusMock; 
(res.send as any) = sendMock;  

const clientsController = new ClientsController(mockClientsService, mockClientsRepository);

describe('Clients Controller', () => {
  let res: Response;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
    jest.clearAllMocks();
  });

  describe('create client', () => {
    test('should create a new client and return 201 status', async () => {
      const req: Request = { body: {
        "clientName": "Paula",
        "clientLastname": "Arce"
      } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      

      await clientsController.createClient(req, res);

      expect(mockClientsService.createClient).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        "id": 5,
        "clientName": "Paula",
        "clientLastname": "Arce"
      });
    });

    test('should handle errors and return 400 status', async () => {
      const req = { body: { } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      
      
      mockClientsService.createClient.mockRejectedValueOnce(new Error('Test 400 error'));

      try {
        await clientsController.createClient(req, res);
      } catch (error) {
        
        expect(mockClientsService.createClient).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Error creating client: Test 400 error');
      };

    });

    test('should handle internal server errors and return 500 status', async () => {
      const req: Request = { body: listClients[0] } as Request;
      mockClientsService.createClient.mockRejectedValueOnce(new Error('Test 500 error'));

      try {
        await clientsController.createClient(req, res);
        
      } catch (error) {
        expect(mockClientsService.createClient).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error: Test 500 error');
      }

  });
  });

  describe('get all clients', () => {
    test('should return an array of clients', () => {
      expect(Array.isArray(listClients)).toBe(true);
    });
  
    test('should contain at least one client', () => {
      expect(listClients.length).toBeGreaterThan(0);
    });
  
    test('should have the expected properties for each client', () => {
  
      listClients.forEach((client) => {
        expect(client).toHaveProperty('id');
        expect(client).toHaveProperty('clientName');
        expect(client).toHaveProperty('clientLastname');
      });
    });
  
    test('should have unique IDs for each client', () => {
      const ids = listClients.map((client) => client.id);
  
      const uniqueIds = [...new Set(ids)];
  
      expect(uniqueIds.length).toBe(ids.length);
    });

    test('should get a list of clients and return 200 status', async () => {
      
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as Response<any, Record<string, any>>;

      await clientsController.listClients(req, res);

      expect(mockClientsRepository.findAllClients).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(listClients);
    })

    test('should handle errors and return 404 status', async () => {
      
      (mockClientsRepository.findAllClients as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 404 error")));

      try {
        await clientsController.listClients(req, res);
      } catch (error) {
        expect(mockClientsRepository.findAllClients).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(`Error getting clients: Test 404 error`);
      }
    });
  
    test('should handle errors and return 500 status for internal server error', async () => {
     
      (mockClientsRepository.findAllClients as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 500 error")));
      
      try {
        await clientsController.listClients(req, res);
      } catch (error) {
        expect(mockClientsRepository.findAllClients).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Internal Server Error: Test 500 error`);
      }
    });
  })

  describe('delete client', () => {
    test('should delete client correctly and return 204 status', async () => {
      
      const req: Request<any> = { params: { id: "4" } } as Request<any>;

      await clientsController.deleteClient(req, res);

      expect(mockClientsRepository.deleteClient).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
  
    })

    test('should handle errors and return 400 status', async () => {
      
      const req: Request<any> = { params: { id: "" } } as Request<any>;

      (mockClientsRepository.deleteClient as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 400 error")));

      try {
        await clientsController.deleteClient(req, res);
      } catch (error) {
        expect(mockClientsRepository.deleteClient).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(`Error deleting client: Test 400 error`);
      }
    });
  
    test('should handle errors and return 500 status for internal server error', async () => {
     
      const req: Request<any> = { params: { id: "invalidID" } } as Request<any>;

      (mockClientsRepository.deleteClient as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 500 error")));
      
      try {
        await clientsController.deleteClient(req, res);
      } catch (error) {
        expect(mockClientsRepository.deleteClient).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Internal Server Error: Test 500 error`);
      }
    });
  })


  describe('update client', () => {
    test('should update client correctly and return 201 status', async () => {
      
      const req: Request<any> = { params: { id: "4" }, body: {
        "clientName": "Jeremías",
        "clientLastname": "Flores"
      } } as Request<any>;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }as unknown as Response<any, Record<string, any>>;

      await clientsController.updateClient(req, res);
      
      expect(mockClientsRepository.updateClient).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        "id": 4,
        "clientName": "Jeremías",
        "clientLastname": "Flores"
      });
    })

    test('should handle errors and return 400 status', async () => {
      
      const req: Request<any> = { params: { id: "" } } as Request<any>;

      (mockClientsRepository.updateClient as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 400 error")));

      try {
        await clientsController.updateClient(req, res);
      } catch (error) {
        expect(mockClientsRepository.updateClient).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(`Error updating client: Test 400 error`);
      }
    });
  
    test('should handle errors and return 500 status for internal server error', async () => {
     
      const req: Request<any> = { params: { id: "invalidID" } } as Request<any>;

      (mockClientsRepository.updateClient as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 500 error")));
      
      try {
        await clientsController.updateClient(req, res);
      } catch (error) {
        expect(mockClientsRepository.updateClient).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Internal Server Error: Test 500 error`);
      }
    });
  })
})