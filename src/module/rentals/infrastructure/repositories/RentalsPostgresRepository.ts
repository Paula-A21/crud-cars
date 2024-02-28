import { IDbConnection } from "../../../../config/sequelizeConfig";
import { CarsEntity } from "../../../cars/domain/CarsEntity";
import { ClientsEntity } from "../../../clients/domain/ClientsEntity";
import { RentalsEntity } from "../../domain/RentalsEntity";
import { RentalsDto } from "../../types/RentalDto";
import { IRentalsRepository } from "./IRentalsRepository";
import { Op } from 'sequelize';


export function RentalsPostgresRepository(db: IDbConnection): IRentalsRepository {

    return {
        async createRental(rentalsEntity: RentalsEntity): Promise<RentalsDto> {

            const client = await db.models.ClientsModel.findByPk(rentalsEntity.clientId);
            if (!client) throw new Error('The client was not found');
            console.log(client, " client");
            
            const car = await db.models.CarsModel.findByPk(rentalsEntity.carId);
            if (!car) throw new Error('The car was not found');
            console.log(car, " car");
            
            const activeRental = await db.models.RentalsModel.findOne({
                where: {
                    clientId: rentalsEntity.clientId,
                    returnDate: {
                        [Op.gt]: new Date()
                    },
                },
            });

            if (activeRental) {
                throw new Error('The client already has an active rental. Cannot create a new one.');
            }

            const rentedCar = await db.models.RentalsModel.findOne({
                where: {
                    carId: rentalsEntity.carId,
                    returnDate: {
                        [Op.gt]: new Date()
                    },
                },
            });

            if (rentedCar) {
                throw new Error('The car is already rented. Cannot create a new rental.');
            }

            const newRental = {
                rentalDate: rentalsEntity.rentalDate,
                returnDate: rentalsEntity.returnDate,
                clientId: rentalsEntity.carId,
                carId: rentalsEntity.carId
            };

            const createdRentalModel = await db.models.RentalsModel.create(newRental);
            if (!createdRentalModel) throw new Error('The rental could not be created');

            const rentalEntity = RentalsEntity.fromDatabaseModel(createdRentalModel);

            const clientEntity = ClientsEntity.fromDatabaseModel(client);
            const carEntity = CarsEntity.fromDatabaseModel(car);

            const createdRentalDto = RentalsDto.fromEntities(rentalEntity, clientEntity, carEntity);

            return createdRentalDto;
        },
        async findAllRentals(): Promise<RentalsEntity[]> {
            const rentals = await db.models.RentalsModel.findAll();
            const rentalsEntities = rentals.map(rental => RentalsEntity.fromDatabaseModel(rental));

            return rentalsEntities;
        },
        async updateRental(rentalId: string, rentalsEntity: RentalsEntity): Promise<RentalsDto> {
            if (!rentalId) throw new Error('Id rental can not be empty');

            const rental = await db.models.RentalsModel.findByPk(rentalId);
            if (!rental) throw new Error('Rental not found');

            const client = await db.models.ClientsModel.findByPk(rentalsEntity.clientId);
            if (!client) throw new Error('The client was not found');

            const car = await db.models.CarsModel.findByPk(rentalsEntity.carId);
            if (!car) throw new Error('The car was not found');

            await rental.update({
                rentalDate: rentalsEntity.rentalDate,
                returnDate: rentalsEntity.returnDate,
                clientId: rentalsEntity.clientId,
                carId: rentalsEntity.carId
            });

            const updatedRentalEntity = RentalsEntity.fromDatabaseModel(await db.models.RentalsModel.findByPk(rentalId));

            const clientEntity = ClientsEntity.fromDatabaseModel(client);
            const carEntity = CarsEntity.fromDatabaseModel(car);

            const createdRentalDto = RentalsDto.fromEntities(updatedRentalEntity, clientEntity, carEntity);

            return createdRentalDto;
        },
        async deleteRental(rentalId: string): Promise<void> {
            if (!rentalId) throw new Error('Id rental can not be empty');

            const rental = await db.models.RentalsModel.findByPk(rentalId);

            if (!rental) throw new Error('Rental not found');

            await rental.destroy();
        }
    };
}
