import { CarsPostgresRepository } from '../module/cars/infrastructure/repositories/CarsPostgresRepository';
import { CarsService } from '../module/cars/service/CarsService';
import { CarsController } from '../module/cars/controller/CarsController';
import { DIContainer } from 'rsdi';
import { IDbConnection, buildSequelizeConnection } from './sequelizeConfig';
import { ClientsPostgresRepository } from '../module/clients/infrastructure/repositories/ClientsPostgresRepository';
import ClientsController from '../module/clients/controller/ClientsController';
import { ClientsService } from '../module/clients/service/ClientsService';
import RentalsController from '../module/rentals/controller/RentalsController';
import { RentalsPostgresRepository } from '../module/rentals/infrastructure/repositories/RentalsPostgresRepository';
import { RentalsService } from '../module/rentals/service/RentalsService';

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
        })     

        .add('clientsRepository', ({ dbConnection }: { dbConnection: IDbConnection }) =>
            ClientsPostgresRepository(dbConnection),
        )
        .add('clientsService', ({ clientsRepository }) => new ClientsService(clientsRepository))
        .add('clientsController', ({ clientsService, clientsRepository }) => {
            return new ClientsController(clientsService, clientsRepository);
        })

        .add('rentalsRepository', ({ dbConnection }: { dbConnection: IDbConnection }) =>
            RentalsPostgresRepository(dbConnection),
        )
        .add('rentalsService', ({ rentalsRepository }) => new RentalsService(rentalsRepository))
        .add('rentalsController', ({ rentalsService, rentalsRepository }) => {
            return new RentalsController(rentalsService, rentalsRepository);
        });  

}