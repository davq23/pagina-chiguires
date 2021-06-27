import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config({
    path: './env/.env',
});

const  { MONGODB_HOST, MONGODB_DATABASE, MONGODB_PASSWORD, MONGODB_PREFIX, MONGODB_USER } = process.env;

mongoose.connect(
    `${MONGODB_PREFIX}://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(db => console.log('Database is connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
