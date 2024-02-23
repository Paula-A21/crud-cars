import { Model, DataTypes, InferAttributes, InferCreationAttributes, Sequelize } from 'sequelize';

class ClientsModel extends Model<InferAttributes<ClientsModel>, InferCreationAttributes<ClientsModel>> {
  declare id: number;
  declare clientName: string;
  declare clientLastname: string;
}


export const initializeClientsModel = (sequelize: Sequelize): void => {
    ClientsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientLastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      tableName: 'Clients'
    }
  );
};

export default ClientsModel;
