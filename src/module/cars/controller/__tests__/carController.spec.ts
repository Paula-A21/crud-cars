import { describe, expect, test, jest } from '@jest/globals';
import { CarsController } from "../CarsController";
import { Request, Response } from 'express';
import { mockCarsRepository, mockCarsService, listCars } from '../../../../__tests__/mocks/carMocks';

const req = {} as Request;
const res: Response = {} as unknown as Response;

const sendMock = jest.fn();
const statusMock = jest.fn().mockReturnValue({ send: sendMock });
(res.status as any) = statusMock; 
(res.send as any) = sendMock;  

const carsController = new CarsController(mockCarsService, mockCarsRepository);

describe('Cars Controller', () => {
  let res: Response;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
    jest.clearAllMocks();
  });

  describe('create car', () => {
    test('should create a new car and return 201 status', async () => {
      const req: Request = { body: {
        "carBrand": "volkswagen",
        "carModel": "Golf GTI",
        "carYear": 2024,
        "carColor": "blue",
        "airConditioner": true,
        "manualOrAutomatic": "automatic"
      } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      

      await carsController.createCar(req, res);

      expect(mockCarsService.createCar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        "id": 5,
        "carBrand": "volkswagen",
        "carModel": "Golf GTI",
        "carYear": 2024,
        "carColor": "blue",
        "airConditioner": true,
        "manualOrAutomatic": "automatic"
      });
    });

    test('should handle errors and return 400 status', async () => {
      const req = { body: { } } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response<any, Record<string, any>>;
      
      
      mockCarsService.createCar.mockRejectedValueOnce(new Error('Test 400 error'));

      try {
        await carsController.createCar(req, res);
      } catch (error) {
        
        expect(mockCarsService.createCar).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Error creating car: Test 400 error');
      };

    });

    test('should handle internal server errors and return 500 status', async () => {
      const req: Request = { body: listCars[0] } as Request;
      mockCarsService.createCar.mockRejectedValueOnce(new Error('Test 500 error'));

      try {
        await carsController.createCar(req, res);
        
      } catch (error) {
        expect(mockCarsService.createCar).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error: Test 500 error');
      }

  });
  });

  describe('get all cars', () => {
    test('should return an array of cars', () => {
      expect(Array.isArray(listCars)).toBe(true);
    });
  
    test('should contain at least one car', () => {
      expect(listCars.length).toBeGreaterThan(0);
    });
  
    test('should have the expected properties for each car', () => {
  
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
  
    test('should have unique IDs for each car', () => {
      const ids = listCars.map((car) => car.id);
  
      const uniqueIds = [...new Set(ids)];
  
      expect(uniqueIds.length).toBe(ids.length);
    });

    test('should get a list of cars and return 200 status', async () => {
      
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as Response<any, Record<string, any>>;

      await carsController.listCars(req, res);

      expect(mockCarsRepository.findAllCars).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(listCars);
    })

    test('should handle errors and return 404 status', async () => {
      
      (mockCarsRepository.findAllCars as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 404 error")));

      try {
        await carsController.listCars(req, res);
      } catch (error) {
        expect(mockCarsRepository.findAllCars).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(`Error getting cars: Test 404 error`);
      }
    });
  
    test('should handle errors and return 500 status for internal server error', async () => {
     
      (mockCarsRepository.findAllCars as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 500 error")));
      
      try {
        await carsController.listCars(req, res);
      } catch (error) {
        expect(mockCarsRepository.findAllCars).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Internal Server Error: Test 500 error`);
      }
    });
  })



  describe('delete car', () => {
    test('should delete car correctly and return 204 status', async () => {
      
      const req: Request<any> = { params: { id: "3" } } as Request<any>;

      await carsController.deleteCar(req, res);

      expect(mockCarsRepository.deleteCar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
  
    })

    test('should handle errors and return 400 status', async () => {
      
      const req: Request<any> = { params: { id: "" } } as Request<any>;

      (mockCarsRepository.deleteCar as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 400 error")));

      try {
        await carsController.deleteCar(req, res);
      } catch (error) {
        expect(mockCarsRepository.deleteCar).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(`Error deleting car: Test 400 error`);
      }
    });
  
    test('should handle errors and return 500 status for internal server error', async () => {
     
      const req: Request<any> = { params: { id: "invalidID" } } as Request<any>;

      (mockCarsRepository.deleteCar as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 500 error")));
      
      try {
        await carsController.deleteCar(req, res);
      } catch (error) {
        expect(mockCarsRepository.deleteCar).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Internal Server Error: Test 500 error`);
      }
    });
  })


  describe('update car', () => {
    test('should update car correctly and return 201 status', async () => {
      
      const req: Request<any> = { params: { id: "4" }, body: {
        "carBrand": "volkswagen",
        "carModel": "Golf GTI",
        "carYear": 2024,
        "carColor": "blue",
        "airConditioner": true,
        "manualOrAutomatic": "automatic"
      } } as Request<any>;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      }as unknown as Response<any, Record<string, any>>;

      await carsController.updateCar(req, res);
      
      expect(mockCarsRepository.updateCar).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        "id": 4,
        "carBrand": "volkswagen",
        "carModel": "Golf GTI",
        "carYear": 2024,
        "carColor": "blue",
        "airConditioner": true,
        "manualOrAutomatic": "automatic"
      });
    })

    test('should handle errors and return 400 status', async () => {
      
      const req: Request<any> = { params: { id: "" } } as Request<any>;

      (mockCarsRepository.updateCar as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 400 error")));

      try {
        await carsController.updateCar(req, res);
      } catch (error) {
        expect(mockCarsRepository.updateCar).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(`Error updating car: Test 400 error`);
      }
    });
  
    test('should handle errors and return 500 status for internal server error', async () => {
     
      const req: Request<any> = { params: { id: "invalidID" } } as Request<any>;

      (mockCarsRepository.updateCar as jest.Mock).mockReturnValueOnce(Promise.reject(new Error("Test 500 error")));
      
      try {
        await carsController.updateCar(req, res);
      } catch (error) {
        expect(mockCarsRepository.updateCar).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(`Internal Server Error: Test 500 error`);
      }
    });
  })
})