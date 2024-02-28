import { CarsEntity } from '../../cars/domain/CarsEntity';
import { ClientsEntity } from '../../clients/domain/ClientsEntity';
import { RentalsEntity } from '../domain/RentalsEntity';

export class RentalsDto {
    constructor(
        public rentalsEntity: RentalsEntity,
        public client: ClientsEntity,
        public car: CarsEntity
    ) {}

    static fromEntities(rentalsEntity: RentalsEntity, client: ClientsEntity, car: CarsEntity): RentalsDto {
        return new RentalsDto(rentalsEntity, client, car);
    }
}