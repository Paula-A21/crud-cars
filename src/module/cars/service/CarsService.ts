import { CarsEntity } from '../domain/CarsEntity';
import { ICarsRepository } from '../infrastructure/repositories/ICarsRepository';

export class CarsService {
    public constructor(public readonly carsRepository: ICarsRepository) { }

    public async createCar(carsEntity: CarsEntity): Promise<CarsEntity> {
        return await this.carsRepository.createCar(carsEntity);
    }
}
