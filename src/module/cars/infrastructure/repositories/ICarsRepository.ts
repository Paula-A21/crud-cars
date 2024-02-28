import { CarsEntity } from "../../domain/CarsEntity";

export interface ICarsRepository {
    findAllCars(): Promise<CarsEntity[]>; 
    createCar(carsEntity: CarsEntity): Promise<CarsEntity>; 
    updateCar(carId: string, carsEntity: CarsEntity): Promise<CarsEntity>; 
    deleteCar(carId: string): Promise<void>;
}
