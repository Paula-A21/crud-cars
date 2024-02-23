import { Request, Response } from 'express';
import { ICarsRepository } from '../infrastructure/domain/repositories/CarsRepository';
import { CarsService } from '../service/CarsService';

export class CarsController {
    private carsService: CarsService;
    private carsRepository: ICarsRepository;

    constructor(carsService: CarsService, carsRepository: ICarsRepository) {
        this.carsService = carsService;
        this.carsRepository = carsRepository;
    }

    async createCar(req: Request, res: Response) {
        
        try {
            const NEW_CAR = await this.carsService.createCar(req.body);
            res.status(201).send(NEW_CAR);
        } catch (error) {
            res.status(500).send(`Error creating car: ${(error as Error).message}`);
        }
    }

    async listCars(req: Request, res: Response) {
        try {
            const CARS = await this.carsRepository.findAllCars();
            res.status(200).send(CARS);
        } catch (error) {
            res.status(500).send(`Error getting cars: ${(error as Error).message}`);
        }
    }

    async updateCar(req: Request, res: Response) {
        try {
            const carId = req.params.id;
            const UPDATED_CAR = await this.carsRepository.updateCar(carId, req.body);
            res.status(201).send(UPDATED_CAR);
        } catch (error) {
            res.status(500).send(`Error updating car: ${(error as Error).message}`);
        }
    }

    async deleteCar(req: Request, res: Response) {
        try {
            const carId = req.params.id;
            await this.carsRepository.deleteCar(carId);
            res.status(204);
        } catch (error) {
            res.status(500).send(`Error deleting car: ${(error as Error).message}`);
        }
    }
}