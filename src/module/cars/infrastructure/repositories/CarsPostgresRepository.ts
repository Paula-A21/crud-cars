import { CarsEntity } from '../../domain/CarsEntity';
import { IDbConnection } from '../../../../config/sequelizeConfig';
import { ICarsRepository } from './ICarsRepository';

export function CarsPostgresRepository(db: IDbConnection): ICarsRepository {
   
    return {
        async createCar(carsEntity: CarsEntity): Promise<CarsEntity> {
            const newCar = {
                carBrand: carsEntity.carBrand,
                carModel: carsEntity.carModel,
                carYear: carsEntity.carYear,
                carColor: carsEntity.carColor,
                airConditioner: carsEntity.airConditioner,
                manualOrAutomatic: carsEntity.manualOrAutomatic,
            };

            if (!newCar) throw new Error('The car could not be created');

            const createdCarModel = await db.models.CarsModel.create(newCar);
            const createdCarEntity = CarsEntity.fromDatabaseModel(createdCarModel);

            return createdCarEntity;
        },
        async findAllCars(): Promise<CarsEntity[]> {
            const cars = await db.models.CarsModel.findAll();
            const carsEntities = cars.map(car => CarsEntity.fromDatabaseModel(car));

            return carsEntities;
        },
        async updateCar(carId: string, carsEntity: CarsEntity): Promise<CarsEntity> {
            if(!carId) throw new Error('Id car can not be empty');

            const car = await db.models.CarsModel.findByPk(carId);

            if (!car) throw new Error('Car not found');

            await car.update(carsEntity);

            const updatedCarEntity = CarsEntity.fromDatabaseModel(await db.models.CarsModel.findByPk(carId));

            return updatedCarEntity;
        },
        async deleteCar(carId: string): Promise<void> {
            if(!carId) throw new Error('Id car can not be empty');
            
            const car = await db.models.CarsModel.findByPk(carId);

            if (!car) throw new Error('Car not found');

            await car.destroy();
        }
    };
}

