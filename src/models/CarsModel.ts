import { Model, DataTypes, InferCreationAttributes, InferAttributes, Sequelize } from 'sequelize';

class CarsModel extends Model<InferAttributes<CarsModel>, InferCreationAttributes<CarsModel>> {

  declare id: number;
  declare carBrand: number;
  declare carModel: string;
  declare carYear: number;
  declare carColor: string;
  declare airConditioner: boolean;
  declare manualOrAutomatic: string;
}

export const initializeCarsModel = (sequelize: Sequelize): void => {
  
  CarsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      carBrand: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      carModel: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      carYear: {
        type: DataTypes.DATE,
        allowNull: false
      },
      carColor: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      airConditioner: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      manualOrAutomatic: {
        type: DataTypes.ENUM("manual", "automatic"),
        allowNull: false
      }
    },
    {
      sequelize: sequelize,
      tableName: 'Cars'
    }
  );
};

export default CarsModel;
