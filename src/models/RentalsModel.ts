import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

class RentalsModel extends Model<InferAttributes<RentalsModel>, InferCreationAttributes<RentalsModel>> {
    declare id: number;
    declare rentalDate: Date;
    declare returnDate: Date;
}

export const initializeRentalsModel = (sequelizeInstance: any) => {
  
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
        }
    },
    {
      sequelize: sequelizeInstance,
      tableName: 'Rentals'
    }
    );
}

export default RentalsModel;
