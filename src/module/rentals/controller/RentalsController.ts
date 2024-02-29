import { Request, Response } from 'express';
import { IRentalsRepository } from "../infrastructure/repositories/IRentalsRepository";
import { RentalsService } from "../service/RentalsService";
import { ValidationError } from 'sequelize';

export class RentalsController {

    private rentalsService: RentalsService;
    private rentalsRepository: IRentalsRepository;

    constructor(rentalsService: RentalsService, rentalsRepository: IRentalsRepository) {
        this.rentalsService = rentalsService;
        this.rentalsRepository = rentalsRepository;
    }

    async createRental(req: Request, res: Response) {
        try {
            const newRental = await this.rentalsService.createRental(req.body); 
            
            res.status(201).send(newRental); 

        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send(`Error adding new rental: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
    async listRentals(req: Request, res: Response) {
        try {
            const rentals = await this.rentalsRepository.findAllRentals();
            res.status(200).send(rentals);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(404).send(`Error getting rentals: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
    async updateRental(req: Request, res: Response) {
        try {
            const rentalId = req.params.id;

            const updatedRental = await this.rentalsRepository.updateRental(rentalId, req.body);
            
            res.send(updatedRental);

        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send(`Error updating rental: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
    async deleteRental(req: Request, res: Response) {
        try {
            const rentalId = req.params.id; 

            await this.rentalsRepository.deleteRental(rentalId);
            res.status(204).send("Ok");
        } catch (error) {
           
            if (error instanceof ValidationError) {
                res.status(400).send(`Error deleting rental: ${(error as Error).message}`);
            } else {
                res.status(500).send(`Internal Server Error: ${(error as Error).message}`);
            }
        }
    }
  
}

export default RentalsController;
