import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from './productsController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { createProductSchema, updateProductSchema } from '../../db/productsSchema.js';
import { verifySeller, verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id',getProductById);
router.post('/', verifyToken ,verifySeller ,validateData(createProductSchema),createProduct);
router.put('/:id',verifyToken ,verifySeller,validateData(updateProductSchema),updateProduct);
router.delete('/:id',verifyToken ,verifySeller,deleteProduct);

export default router;
