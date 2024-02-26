import { CarsService } from "../../module/cars/service/CarsService";
// import { CarsEntity } from '../../module/cars/domain/CarsEntity';
import { ICarsRepository } from "../../module/cars/infrastructure/repositories/ICarsRepository";

export const listCars = [
	{
		"id": 1,
		"carBrand": "toyota",
		"carModel": "camary",
		"carYear": 2000,
		"carColor": "blue",
		"airConditioner": false,
		"manualOrAutomatic": "manual"
	},
	{
		"id": 2,
		"carBrand": "fiat",
		"carModel": "canal",
		"carYear": 1980,
		"carColor": "white",
		"airConditioner": true,
		"manualOrAutomatic": "automatic"
	},
	{
		"id": 3,
		"carBrand": "renault",
		"carModel": "comol",
		"carYear": 1997,
		"carColor": "green",
		"airConditioner": false,
		"manualOrAutomatic": "manual"
	},
	{
		"id": 4,
		"carBrand": "renault",
		"carModel": "comol",
		"carYear": 1997,
		"carColor": "green",
		"airConditioner": false,
		"manualOrAutomatic": "manual"
	},
	{
		"id": 5,
		"carBrand": "renault",
		"carModel": "comol",
		"carYear": 1997,
		"carColor": "green",
		"airConditioner": false,
		"manualOrAutomatic": "manual"
	}
]


export const mockCarsRepository: ICarsRepository = {
	createCar: jest.fn(),
	findAllCars: jest.fn(),
	updateCar: jest.fn(),
	deleteCar: jest.fn(),
  };
  
export const mockCarsService: jest.Mocked<CarsService> = {
	carsRepository: mockCarsRepository,
	createCar: jest.fn(),
};
