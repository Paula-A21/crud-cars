import { Sequelize } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import CarsModel, { initializeCarsModel } from '../CarsModel';
import ClientsModel, { initializeClientsModel } from '../ClientsModel';
import RentalsModel, { initializeRentalsModel } from '../RentalsModel';
import { config } from "dotenv";

config();

export interface DbConnection extends Sequelize { }

export function configureSequelizeDatabase(options: SequelizeOptions): DbConnection {
    try {
        const sequelize = new Sequelize(options);

        initializeCarsModel(sequelize);
        initializeClientsModel(sequelize);
        initializeRentalsModel(sequelize);

        defineAssociations();

        return sequelize as DbConnection;
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

export function buildSequelizeConnection(): DbConnection {
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