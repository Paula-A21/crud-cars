import { DbConnection, buildSequelizeConnection } from '../models/config/sequelizeConfig';
import { ProviderCarRepository } from '../repositories/CarRepositoryProvider';
import { CarService } from '../services/CarService';
import { CarsController } from '../controllers/CarsController';
import { DIContainer } from 'rsdi';

export type AppDIContainer = ReturnType<typeof configureDI>;

export default function configureDI() {
    return new DIContainer()
        .add('dbConnection', buildSequelizeConnection)
        .add('carRepository', ({ dbConnection }: { dbConnection: DbConnection }) =>
            ProviderCarRepository(dbConnection),
        )
        .add('carService', ({ carRepository }) => new CarService(carRepository))
        .add('carsController', ({ carService, carRepository }) =>
            CarsController(carService, carRepository),
        );
}
