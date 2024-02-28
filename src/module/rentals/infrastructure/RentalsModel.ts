import { Model, DataTypes, InferAttributes, InferCreationAttributes, Sequelize } from 'sequelize';

class RentalsModel extends Model<InferAttributes<RentalsModel>, InferCreationAttributes<RentalsModel>> {
    declare id: number;
    declare rentalDate: Date;
    declare returnDate: Date;
    declare clientId: number;
    declare carId: number;
}

export const initializeRentalsModel = (sequelize: Sequelize): void => {
  
    RentalsModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rentalDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
      sequelize: sequelize,
      tableName: 'Rentals'
    }
    );
}

export default RentalsModel;
