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
  let res: Response;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
    jest.clearAllMocks();
  });

  describe('create car', () => {
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
    it('should handle errors and return 400 status', async () => {
      const req = { body: {} } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      
      mockCarsService.createCar.mockRejectedValueOnce(new Error('Test error'));

      await carsController.createCar(req, res);

      expect(mockCarsService.createCar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Error creating car: Test error');
    });
    test('should handle internal server errors and return 500 status', async () => {
      const req: Request = { body: listCars[0] } as Request;
      mockCarsService.createCar.mockRejectedValueOnce(new Error('Internal Server Error'));

      await carsController.createCar(req, res);

      expect(mockCarsService.createCar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error: Internal Server Error');
  });
  });

  describe('get all cars', () => {
    test('should return an array of cars', () => {
      expect(Array.isArray(listCars)).toBe(true);
    });
  
    it('should contain at least one car', () => {
      expect(listCars.length).toBeGreaterThan(0);
    });
  
    it('should have the expected properties for each car', () => {
  
      listCars.forEach((car) => {
        expect(car).toHaveProperty('id');
        expect(car).toHaveProperty('carBrand');
        expect(car).toHaveProperty('carModel');
        expect(car).toHaveProperty('carYear');
        expect(car).toHaveProperty('carColor');
        expect(car).toHaveProperty('airConditioner');
        expect(car).toHaveProperty('manualOrAutomatic');
      });
    });
  
    it('should have unique IDs for each car', () => {
      const ids = listCars.map((car) => car.id);
  
      const uniqueIds = [...new Set(ids)];
  
      expect(uniqueIds.length).toBe(ids.length);
    });

    let res: Response;

    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      jest.clearAllMocks();
    });
  })

  describe('delete car', () => {
    

  })
})