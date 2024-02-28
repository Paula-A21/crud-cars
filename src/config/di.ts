import { CarsPostgresRepository } from '../module/cars/infrastructure/repositories/CarsPostgresRepository';
import { CarsService } from '../module/cars/service/CarsService';
import { CarsController } from '../module/cars/controller/CarsController';
import { DIContainer } from 'rsdi';
import { IDbConnection, buildSequelizeConnection } from './sequelizeConfig';

export type AppDIContainer = ReturnType<typeof configureDI>;

export default function configureDI() {
    return new DIContainer()
        .add('dbConnection', buildSequelizeConnection)
        .add('carsRepository', ({ dbConnection }: { dbConnection: IDbConnection }) =>
            CarsPostgresRepository(dbConnection),
        )
        .add('carsService', ({ carsRepository }) => new CarsService(carsRepository))
        .add('carsController', ({ carsService, carsRepository }) => {
            return new CarsController(carsService, carsRepository);
        });       

}