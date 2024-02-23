import { CarEntity } from "../infrastructure/domain/entities/CarsEntity";
import { ICarsRepository } from "../infrastructure/domain/repositories/CarsRepository";

export class CarsService {
    public constructor(public readonly carsRepository: ICarsRepository) { }

    public async createCar(carsEntity: CarEntity): Promise<void> {

       return await this.carsRepository.createCar(carsEntity);
    }
}