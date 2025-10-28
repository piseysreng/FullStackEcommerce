import { Router } from "express";
import { createOrder ,listOrders,getOrder, updateOrder} from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertOrderWithItemsSchema, updateOrderSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get('/',verifyToken, listOrders);
router.get('/:id',verifyToken, getOrder);
router.put('/:id',verifyToken, validateData(updateOrderSchema), updateOrder);
router.post('/',verifyToken , validateData(insertOrderWithItemsSchema) ,createOrder);

export default router;