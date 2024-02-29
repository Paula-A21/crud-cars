import { RentalsEntity } from "../domain/RentalsEntity";
import { IRentalsRepository } from "../infrastructure/repositories/IRentalsRepository";
import { RentalsDto } from "../types/RentalDto";

export class RentalsService {
    public constructor(public readonly rentalsRepository: IRentalsRepository) { }

    public async createRental(rentalsEntity: RentalsEntity): Promise<RentalsDto> {
        return await this.rentalsRepository.createRental(rentalsEntity);
    }
}