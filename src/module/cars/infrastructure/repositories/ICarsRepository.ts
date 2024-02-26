import { IUpdateCarDto } from '../../types/IupdateCarDto';
import { CarsEntity } from "../../domain/CarsEntity";

export interface ICarsRepository {
    findAllCars(): Promise<any[]>; 
    createCar(carEntity: CarsEntity): Promise<any>; 
    updateCar(carId: string, updateCarDto: IUpdateCarDto): Promise<any>;
    deleteCar(carId: string): Promise<void>;
}