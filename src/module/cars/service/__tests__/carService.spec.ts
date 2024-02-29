import { describe, expect, test, jest } from '@jest/globals';
import { CarsService } from '../CarsService';
import { mockCarsRepository, mockCarsService, newCar } from '../../../../__tests__/mocks/carMocks';

const carsService = new CarsService(mockCarsRepository);

describe('Cars Service', () => {

    test('should create a new car', async () => {
    
        const createNewCar = await carsService.createCar(newCar);

        expect(mockCarsRepository.createCar).toHaveBeenCalledWith(newCar);
        expect(createNewCar).toEqual({
          "id": 5,
          "carBrand": "volkswagen",
          "carModel": "Golf GTI",
          "carYear": 2024,
          "carColor": "blue",
          "airConditioner": true,
          "manualOrAutomatic": "automatic"
        });
      });
})