import { Request, Response } from 'express';
import { ICarsRepository } from '../infrastructure/repositories/ICarsRepository';
import { CarsService } from '../service/CarsService';
import { ValidationError } from 'sequelize';

export class CarsController {
    private carsService: CarsService;
    private carsRepository: ICarsRepository;

    constructor(carsService: CarsService, carsRepository: ICarsRepository) {
        this.carsService = carsService;
        this.carsRepository = carsRepository;
    }

    async createCar(req: Request, res: Response) { 
        try {
            const newCar = await this.carsService.createCar(req.body);
            res.status(201).send(newCar);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send(`Error creating car: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }

    async listCars(req: Request, res: Response) {
        try {
            const cars = await this.carsRepository.findAllCars();
            res.status(200).send(cars);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(404).send(`Error getting cars: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }

    async updateCar(req: Request, res: Response) {
        try {
            const carId = req.params.id;
            const updatedCar = await this.carsRepository.updateCar(carId, req.body);
            res.status(201).send(updatedCar);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send(`Error updating car: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }

    async deleteCar(req: Request, res: Response) {
        try {
            const carId = req.params.id;
            await this.carsRepository.deleteCar(carId);
            res.status(204);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send(`Error deleting car: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
}