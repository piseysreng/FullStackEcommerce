import { Router } from 'express';

const router = Router();

router.get('/',(req, res) => {
    res.send('The List of Products');
});

router.get('/:id',(req, res) => {
    console.log(req.params);
    res.send('A Single Product with ID');
});

router.post('/',(req, res) => {
    res.send('New Product Created');
});

export default router;
