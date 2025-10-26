import express from 'express';
import productsRoutes from './routes/products/index';

const port = 3000;
const app = express();

app.get('/',(req, res) => {
    res.send('Hello World! Pisey Sreng');
});

app.use('/products', productsRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})