import { IDbConnection } from '../../../../../config/sequelizeConfig';
import { IUpdateCarDto } from '../../../types/updateCarDto';
import { CarEntity } from '../entities/CarsEntity';
import { ICarsRepository } from './CarsRepository';

export function CarsPostgresRepository(db: IDbConnection): ICarsRepository {
    return {
        async createCar(carEntity: CarEntity): Promise<CarEntity> {
            const NEW_CAR = {
                carBrand: carEntity.carBrand,
                carModel: carEntity.carModel,
                carYear: carEntity.carYear,
                carColor: carEntity.carColor,
                airConditioner: carEntity.airConditioner,
                manualOrAutomatic: carEntity.manualOrAutomatic,
            };

            if(!NEW_CAR) throw new Error('The car could not be created');

            await db.models.CarsModel.create(NEW_CAR);
            
            return NEW_CAR;
        },
        async findAllCars() {
            const CARS = await db.models.CarsModel.findAll();

            if (!CARS) throw new Error('Cars not found');

            return CARS;
        },
        async updateCar(carId: string, updateCarDto: IUpdateCarDto): Promise<any> {
            const CAR = await db.models.CarsModel.findByPk(carId);

            if (!CAR) throw new Error('Car not found');

            await CAR.update(updateCarDto);

            const UPDATED_CAR = await db.models.CarsModel.findByPk(carId);

            return UPDATED_CAR;
        },
        async deleteCar(carId: string): Promise<void> {
            const CAR = await db.models.CarsModel.findByPk(carId);

            if (!CAR) throw new Error('Car not found');

            await CAR.destroy();
        }
    };
};