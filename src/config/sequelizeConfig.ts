import { Sequelize } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { config } from "dotenv";

import CarsModel, { initializeCarsModel } from '../module/cars/infrastructure/CarsModel';
import ClientsModel, { initializeClientsModel } from '../module/clients/model/ClientsModel';
import RentalsModel, { initializeRentalsModel } from '../module/rentals/model/RentalsModel';

config();

export interface IDbConnection extends Sequelize { }

export function configureSequelizeDatabase(options: SequelizeOptions): IDbConnection {
    try {
        const sequelize = new Sequelize(options);

        initializeCarsModel(sequelize);
        initializeClientsModel(sequelize);
        initializeRentalsModel(sequelize);

        defineAssociations();

        return sequelize as IDbConnection;
    } catch (error) {
        console.error('Error configuring Sequelize database:', error);
        throw new Error('Unable to configure Sequelize database');
    }
}

function defineAssociations() {
    RentalsModel.belongsTo(ClientsModel, { foreignKey: 'clientId' });
    RentalsModel.belongsTo(CarsModel, { foreignKey: 'carId' });
    ClientsModel.hasMany(RentalsModel, { foreignKey: 'clientId' });
    CarsModel.hasMany(RentalsModel, { foreignKey: 'carId' });
}

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export function buildSequelizeConnection(): IDbConnection {
    return configureSequelizeDatabase({
        dialect: 'postgres',
        logging: false,
        native: false,
        dialectOptions: {
            ssl: false,
        },
        username: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        database: 'cars',
    });
}