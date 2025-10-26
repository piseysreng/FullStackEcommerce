import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
    res.send('Another list of product');
}

export function getProductById(req: Request, res: Response) {
    res.send('Product by ID');
}

export function createProduct(req: Request, res: Response) {
    res.send('Create Product');
}

export function updateProduct(req: Request, res: Response) {
    res.send('Update Product');
}
export function deleteProduct(req: Request, res: Response) {
    res.send('Delete Product');
}