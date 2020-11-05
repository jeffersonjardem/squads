import { Router } from 'express';
import ProductController from '../controller/ProductController';

const routes = new Router();

routes.get('/products', ProductController.get);
routes.get('/products/:id', ProductController.getById);
routes.post('/products', ProductController.post);
routes.put('/products/:id', ProductController.put);
routes.delete('/products/:id', ProductController.delete);

export default routes;
