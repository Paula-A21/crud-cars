import { IUpdateCarDto } from '../../../types/updateCarDto';
import { CarEntity } from "../entities/CarsEntity";

export interface ICarsRepository {
    findAllCars(): Promise<any[]>; 
    createCar(carEntity: CarEntity): Promise<any>; 
    updateCar(carId: string, updateCarDto: IUpdateCarDto): Promise<any>;
    deleteCar(carId: string): Promise<void>;
}