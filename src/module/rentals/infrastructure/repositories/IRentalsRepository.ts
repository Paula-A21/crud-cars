import { RentalsEntity } from "../../domain/RentalsEntity";
import { RentalsDto } from "../../types/RentalDto";

export interface IRentalsRepository {
    findAllRentals(): Promise<RentalsEntity[]>; 
    createRental(rentalsEntity: RentalsEntity): Promise<RentalsDto>; 
    updateRental(rentalId: string, rentalsEntity: RentalsEntity): Promise<RentalsDto>; 
    deleteRental(rentalId: string): Promise<void>;
}