import { IUpdateCarDto } from '../../types/IUpdateCarDto';
import { CarsEntity } from "../../domain/CarsEntity";

export interface ICarsRepository {
    findAllCars(): Promise<CarsEntity[]>; 
    createCar(carEntity: CarsEntity): Promise<CarsEntity>; 
    updateCar(carId: string, updateCarDto: IUpdateCarDto): Promise<CarsEntity>; 
    deleteCar(carId: string): Promise<void>;
}
