
import express from 'express'
import * as productController from '../../controller/product.controller'
import { authenticateToken } from '../../middleware/auth.middleware'
import { middlewareRoles } from '../../middleware/roles.middleware'
export const productRouter = express.Router()

productRouter
  .get('/', authenticateToken, productController.getProduct)
  .post('/', authenticateToken, middlewareRoles("ADMIN"), productController.createProduct)
  .patch('/:id', authenticateToken, middlewareRoles("ADMIN"), productController.updateProduct)
  .delete('/:id', authenticateToken, middlewareRoles("ADMIN") ,productController.deleteProduct)
  .get('/:id', authenticateToken, productController.getOneProduct)