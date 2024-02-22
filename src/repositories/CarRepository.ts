import { CreateCarDto } from '../types/createCarDto';
import { UpdateCarDto } from '../types/updateCarDto';

export interface CarRepository {
    findAllCars(): Promise<any[]>; 
    createCar(createCarDto: CreateCarDto): Promise<any>; 
    updateCar(carId: string, updateCarDto: UpdateCarDto): Promise<any>;
    deleteCar(carId: string): Promise<void>;
}

