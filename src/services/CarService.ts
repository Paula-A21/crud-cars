import { CarRepository } from "../repositories/CarRepository";
import { CreateCarDto } from '../types/createCarDto';

export class CarService {
    public constructor(public readonly carRepository: CarRepository) { }

    public async createCar(createCarDto: CreateCarDto) {
        return this.carRepository.createCar(createCarDto);
    }
}
