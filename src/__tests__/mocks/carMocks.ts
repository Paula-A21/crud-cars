import { CarsService } from "../../module/cars/service/CarsService";
import { ICarsRepository } from "../../module/cars/infrastructure/repositories/ICarsRepository";
import { CarsEntity } from "../../module/cars/domain/CarsEntity";

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
		carBrand: "peugeot",
		carModel: "SUV 3008",
		carYear: 2020,
		carColor: "black",
		airConditioner: false,
		manualOrAutomatic: "manual"
	},
	{
		id: 5,
		carBrand: "renault",
		carModel: "comol",
		carYear: 1997,
		carColor: "green",
		airConditioner: false,
		manualOrAutomatic: "manual"
	}
]


export const mockCarsRepository: ICarsRepository = {
	createCar: jest.fn(),
	findAllCars: jest.fn(() => Promise.resolve(listCars)),
	updateCar: jest.fn(() => Promise.resolve({
		id: 5,
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
	createCar: jest.fn(),
};
