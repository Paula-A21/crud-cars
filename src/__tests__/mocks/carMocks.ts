import { CarsService } from "../../module/cars/service/CarsService";
import { ICarsRepository } from "../../module/cars/infrastructure/repositories/ICarsRepository";
import { CarsEntity } from "../../module/cars/domain/CarsEntity";
import { ValidationError, ValidationErrorItem } from "sequelize";

export const listCars: CarsEntity[] = [
	{
		id: 1,
		carBrand: "toyota",
		carModel: "camary",
		carYear: 2000,
		carColor: "pink",
		airConditioner: false,
		manualOrAutomatic: "manual"
	},
	{
		id: 2,
		carBrand: "fiat",
		carModel: "canal",
		carYear: 1980,
		carColor: "white",
		airConditioner: true,
		manualOrAutomatic: "automatic"
	},
	{
		id: 3,
		carBrand: "renault",
		carModel: "comol",
		carYear: 1997,
		carColor: "green",
		airConditioner: true,
		manualOrAutomatic: "automatic"
	},
	{
		id: 4,
		carBrand: "renault",
		carModel: "comol",
		carYear: 1997,
		carColor: "green",
		airConditioner: false,
		manualOrAutomatic: "manual"
	}
]

export const newCar: CarsEntity = {
	id: 5,
	carBrand: "volkswagen",
	carModel: "Golf GTI",
	carYear: 2024,
	carColor: "blue",
	airConditioner: true,
	manualOrAutomatic: "automatic"
}

export const mockCarsRepository: ICarsRepository = {
	createCar: jest.fn(() => Promise.resolve({
		id: 5,
		carBrand: "volkswagen",
		carModel: "Golf GTI",
		carYear: 2024,
		carColor: "blue",
		airConditioner: true,
		manualOrAutomatic: "automatic"
	})),
	findAllCars: jest.fn(() => Promise.resolve(listCars)),
	updateCar: jest.fn(() => Promise.resolve({
		id: 4,
		carBrand: "volkswagen",
		carModel: "Golf GTI",
		carYear: 2024,
		carColor: "blue",
		airConditioner: true,
		manualOrAutomatic: "automatic"
	})),
	deleteCar: jest.fn(),
};

export const mockCarsService: jest.Mocked<CarsService> = {
  carsRepository: mockCarsRepository,
  createCar: jest.fn((carsEntity: CarsEntity) => {	

    if (carsEntity.carBrand === 'invalidBrand') {
      // Simulate a validation error for testing
      const validationErrorItem: ValidationErrorItem = {
        message: 'Validation error message',
        type: 'Validation error',
        path: 'carBrand',
        value: carsEntity.carBrand,
        origin: 'FUNCTION',
        instance: null,
        validatorKey: 'notEmpty',
        validatorName: 'notEmpty',
        validatorArgs: [],  
        isValidationErrorItemOrigin: (origin: string) => origin === 'FUNCTION', 
        normalizeString: (str: string) => str, 
        getValidatorKey: () => 'notEmpty', 
      } as any; 

      const validationError = new ValidationError('Validation error message', [validationErrorItem]);
      return Promise.reject(validationError);
    } else {
      return Promise.resolve({
        id: 5,
        carBrand: "volkswagen",
        carModel: "Golf GTI",
        carYear: 2024,
        carColor: "blue",
        airConditioner: true,
        manualOrAutomatic: "automatic"
      });
    }
  }),
};

