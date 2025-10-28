import express, { json, urlencoded } from 'express';
import productsRoutes from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import ordersRoutes from './routes/orders/index.js';

const port = process.env.PORT || 3000;
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());


app.get('/', (req, res) => {
    res.send('Hello World! Pisey Sreng');
});

app.use('/products', productsRoutes);
app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})