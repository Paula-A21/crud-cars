import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

class ClientsModel extends Model<InferAttributes<ClientsModel>, InferCreationAttributes<ClientsModel>> {
  declare id: number;
  declare clientName: string;
  declare clientLastname: string;
}


export const initializeClientsModel = (sequelizeInstance: any) => {
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
      sequelize: sequelizeInstance,
      tableName: 'Clients'
    }
  );
};

export default ClientsModel;
