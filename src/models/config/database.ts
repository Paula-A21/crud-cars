import { config } from "dotenv";
import { Sequelize } from "sequelize";
import { initializeCarsModel } from "../CarsModel";
import { initializeClientsModel } from "../ClientsModel";
import { initializeRentalsModel } from "../RentalsModel";

config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/cars`, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: false,
  },
});

initializeCarsModel(sequelize);
initializeClientsModel(sequelize);
initializeRentalsModel(sequelize);

export default sequelize;
