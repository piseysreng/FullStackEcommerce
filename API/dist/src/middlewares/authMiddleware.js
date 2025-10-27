import jwt from 'jsonwebtoken';
export function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    try {
        // Decode JWT Token Data
        const decoded = jwt.verify(token, 'your-secret');
        if (typeof decoded !== 'object' || !decoded?.userId) {
            res.status(401).json({ error: "Access denied" });
            return;
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Access denied" });
    }
}
export function verifySeller(req, res, next) {
    const role = req.role;
    if (role !== 'seller') {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    next();
}
