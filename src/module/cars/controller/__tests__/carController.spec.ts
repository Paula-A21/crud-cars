import { describe, expect, test, jest } from '@jest/globals';
import { CarsController } from "../CarsController";
import { Request, Response } from 'express';
import { mockCarsRepository, mockCarsService, listCars } from '../../../../__tests__/mocks/carMocks';

jest.mock('axios');

const req = {} as Request;
const res: Response = {} as unknown as Response;

const sendMock = jest.fn();
const statusMock = jest.fn().mockReturnValue({ send: sendMock });
(res.status as any) = statusMock; 
(res.send as any) = sendMock;  

const carsController = new CarsController(mockCarsService, mockCarsRepository);

describe('CarsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCar', () => {
    it('should create a new car and return 201 status', async () => {
      const req: Request = { body: listCars[0] } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      

      await carsController.createCar(req, res);

      expect(mockCarsService.createCar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle errors and return 500 status', async () => {
      const req = { body: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      
      mockCarsService.createCar.mockRejectedValueOnce(new Error('Test error'));

      await carsController.createCar(req, res);

      expect(mockCarsService.createCar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error creating car: Test error');
    });
  });

});