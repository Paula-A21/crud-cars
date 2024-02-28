import { Model, DataTypes, InferCreationAttributes, InferAttributes } from 'sequelize';

class CarsModel extends Model<InferAttributes<CarsModel>, InferCreationAttributes<CarsModel>> {

  declare id: number;
  declare brand: number;
  declare model: string;
  declare year: number;
  declare color: string;
  declare airConditioner: boolean;
  declare manualOrAutomatic: string;
}

export const initializeCarsModel = (sequelizeInstance: any) => {
  
  CarsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      brand: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      year: {
        type: DataTypes.DATE,
        allowNull: false
      },
      color: {
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
      sequelize: sequelizeInstance,
      tableName: 'Cars'
    }
  );
};

export default CarsModel;
