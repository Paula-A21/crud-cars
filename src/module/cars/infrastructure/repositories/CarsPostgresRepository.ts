import { CarsEntity } from '../../domain/CarsEntity';
import { IDbConnection } from '../../../../config/sequelizeConfig';
import { ICarsRepository } from './ICarsRepository';
import { IUpdateCarDto } from '../../types/IUpdateCarDto';

export function CarsPostgresRepository(db: IDbConnection): ICarsRepository {
    const mapModelToEntity = (model: any): CarsEntity => {
        return new CarsEntity(
            model.id,
            model.carBrand,
            model.carModel,
            model.carYear,
            model.carColor,
            model.airConditioner,
            model.manualOrAutomatic
        );
    };

    return {
        async createCar(carEntity: CarsEntity): Promise<CarsEntity> {
            const newCar = {
                carBrand: carEntity.carBrand,
                carModel: carEntity.carModel,
                carYear: carEntity.carYear,
                carColor: carEntity.carColor,
                airConditioner: carEntity.airConditioner,
                manualOrAutomatic: carEntity.manualOrAutomatic,
            };

            if (!newCar) throw new Error('The car could not be created');

            const createdCarModel = await db.models.CarsModel.create(newCar);
            const createdCarEntity = mapModelToEntity(createdCarModel);

            return createdCarEntity;
        },
        async findAllCars(): Promise<CarsEntity[]> {
            const cars = await db.models.CarsModel.findAll();
            const carsEntities = cars.map(mapModelToEntity);

            return carsEntities;
        },
        async updateCar(carId: string, updateCarDto: IUpdateCarDto): Promise<CarsEntity> {
            if(!carId) throw new Error('Id car can not be empty');

            const car = await db.models.CarsModel.findByPk(carId);

            if (!car) throw new Error('Car not found');

            await car.update(updateCarDto);

            const updatedCarEntity = mapModelToEntity(await db.models.CarsModel.findByPk(carId));

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

