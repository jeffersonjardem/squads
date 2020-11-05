import { Router } from 'express';
import ProductController from '../controller/ProductController';
import UserController from '../controller/UserController';
import AuthController from '../controller/AuthController';
import CheckJwt from '../middleware/index';

const routes = new Router();

routes.post('/users', UserController.post);
routes.post('/login', AuthController.post);

routes.use(CheckJwt.checkToken);

routes.get('/users', UserController.get);
routes.get('/products', ProductController.get);
routes.get('/products/:id', ProductController.getById);
routes.post('/products', ProductController.post);
routes.put('/products/:id', ProductController.put);
routes.delete('/products/:id', ProductController.delete);

export default routes;
