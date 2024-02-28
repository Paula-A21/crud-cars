import { Express } from 'express';
import { AppDIContainer } from '../config/di';

export default function configureRouter(app: Express, diContainer: AppDIContainer): void {
    try {
        const carsController = diContainer.get('carsController');
        const clientsController = diContainer.get('clientsController');
        const rentalsController = diContainer.get('rentalsController');

        app.post('/cars', (req, res) => carsController.createCar(req, res));
        app.get('/cars', (req, res) => carsController.listCars(req, res));
        app.put('/cars/:id', (req, res) => carsController.updateCar(req, res));
        app.delete('/cars/:id', (req, res) => carsController.deleteCar(req, res));

        app.post('/clients', (req, res) => clientsController.createClient(req, res));
        app.get('/clients', (req, res) => clientsController.listClients(req, res));
        app.put('/clients/:id', (req, res) => clientsController.updateClient(req, res));
        app.delete('/clients/:id', (req, res) => clientsController.deleteClient(req, res));

        app.post('/rentals', (req, res) => rentalsController.createRental(req, res));
        app.get('/rentals', (req, res) => rentalsController.listRentals(req, res));
        app.put('/rentals/:id', (req, res) => rentalsController.updateRental(req, res));
        app.delete('/rentals/:id', (req, res) => rentalsController.deleteRental(req, res));
    } catch (error) {
        console.error('Error configuring routes:', error);
        throw new Error('Unable to configure routes');
    }
}
