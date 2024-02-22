import { Request, Response } from 'express';
import { CarService } from '../services/CarService';
import { CarRepository } from '../repositories/CarRepository';

export function CarsController(carService: CarService, carRepository: CarRepository) {
    return {
        async postCar(req: Request, res: Response) {
            try {
                const newCar = await carService.createCar(req.body); 
                
                res.send('Car created successfully' + newCar); 

            } catch (error) {
                console.error('Error creating car:', error);
                res.status(500).send('Internal Server Error');
            }
        },
        async getCars(req: Request, res: Response) {
            try {
                const cars = await carRepository.findAllCars();
                res.send(cars);
            } catch (error) {
                console.error('Error geting cars:', error);
                res.status(500).send('Internal Server Error');
            }
        },
        async putCar(req: Request, res: Response) {
            try {
                const carId = req.params.id;  
                
                await carRepository.updateCar(carId, req.body);
                res.send('Car updated successfully');
            } catch (error) {
                console.error('Error updating car:', error);
                res.status(500).send('Internal Server Error');
            }
        },
        async deleteCar(req: Request, res: Response) {
            try {
                const carId = req.params.id; 

                await carRepository.deleteCar(carId);
                res.send('Car deleted successfully');
            } catch (error) {
                console.error('Error deleting car:', error);
                res.status(500).send('Internal Server Error');
            }
        }
    };
    };

