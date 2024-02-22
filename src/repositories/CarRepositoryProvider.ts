import { DbConnection } from '../models/config/sequelizeConfig';
import { CarRepository } from './CarRepository';
import { CreateCarDto } from '../types/createCarDto';
import { UpdateCarDto } from '../types/updateCarDto';

export function ProviderCarRepository(db: DbConnection): CarRepository {
    return {
        async createCar(createCarDto: CreateCarDto): Promise<CreateCarDto> {
            const newCar = {
                carBrand: createCarDto.carBrand,
                carModel: createCarDto.carModel,
                carYear: createCarDto.carYear,
                carColor: createCarDto.carColor,
                airConditioner: createCarDto.airConditioner,
                manualOrAutomatic: createCarDto.manualOrAutomatic,
            };

            if(!newCar) throw new Error('The car could not be created');

            await db.models.CarsModel.create(newCar);

            return newCar;
        },
        async findAllCars() {
           const cars = await db.models.CarsModel.findAll();
        
           if (!cars) throw new Error('Cars not found');
            
           return cars;
        },
        async updateCar(carId: string, updateCarDto: UpdateCarDto): Promise<any> {
            const car = await db.models.CarsModel.findByPk(carId);
            
            if (!car) throw new Error('Car not found');
            
            await car.update(updateCarDto);

            return car;
        },
        async deleteCar(carId: string): Promise<void> {
            const car = await db.models.CarsModel.findByPk(carId);

            if (!car) throw new Error('Car not found');
        
            await car.destroy();
        }
    };
};

