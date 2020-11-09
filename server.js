const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./Backend/config/db');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');

const {uploadRoutes} = require('./Backend/routes/uploadRoutes')
const {productRoutes} = require('./Backend/routes/productRoutes');
const {userRoutes} = require('./Backend/routes/userRoutes');
const {orderRoutes} = require('./Backend/routes/orderRoutes');
const {notFound, errorHandler} = require('./Backend/middleware/errorMiddleware');

dotenv.config()

connectDB()

const app = express();

app.use(express.json())

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')))
}else {
    app.get('/', (req, res) => {
        res.json("API is running...")
    })
}


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});