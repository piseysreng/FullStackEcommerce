import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createUserSchema, loginSchema, usersTable } from "../../db/usersSchema.js";
import bycrypt from 'bcryptjs';
import { db } from '../../db/index.js';
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';
const router = Router();
router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
        const data = req.body;
        data.password = await bycrypt.hash(data.password, 10);
        const [user] = await db.insert(usersTable).values(data).returning();
        user.password = "";
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
});
router.post('/login', validateData(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!user) {
            res.status(401).json({ error: 'Authentication fail' });
            return;
        }
        const comparePassword = await bycrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(401).json({ error: 'Authentication fail' });
            return;
        }
        user.password = "";
        // Create a JWT Token
        const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret', { expiresIn: '30d' });
        res.status(200).json({ token, user });
        // res.send(200);
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
});
export default router;
