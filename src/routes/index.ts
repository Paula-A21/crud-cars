import { Express } from 'express';
import { AppDIContainer } from '../config/di';

export default function configureRouter(app: Express, diContainer: AppDIContainer): void {
  
  const carsController = diContainer.get('carsController');
  
  app.post('/cars', carsController.postCar);
  app.get('/cars', carsController.getCars);
  app.put('/cars/:id', carsController.putCar);
  app.delete('/cars/:id', carsController.deleteCar);
}
