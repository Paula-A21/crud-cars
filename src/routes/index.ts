import { Express } from 'express';
import { AppDIContainer } from '../config/di';

export default function configureRouter(app: Express, diContainer: AppDIContainer): void {
    try {
        const carsController = diContainer.get('carsController');
        
        app.post('/cars', (req, res) => carsController.createCar(req, res));
        app.get('/cars', (req, res) => carsController.listCars(req, res));
        app.put('/cars/:id', (req, res) => carsController.updateCar(req, res));
        app.delete('/cars/:id', (req, res) => carsController.deleteCar(req, res));
    } catch (error) {
        console.error('Error configuring routes:', error);
        throw new Error('Unable to configure routes');
    }
}
