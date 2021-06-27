import express from 'express';
import { newOpinion, allOpinions } from './controllers/opinion.controllers.js';
import { login, newUser } from './controllers/user.controllers.js';
import jwtMiddleware from './middlewares/JWTMiddleware.js';

const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        console.error(err);

        return res.sendStatus(400);
    }
    
    next();
});

app.get('test', (req, res) => {
    return res.send('HOLAAAAA');
});

app.post('/users/new', jwtMiddleware({
    noAuth: true
}, newUser));


app.post('/users/login', jwtMiddleware({
    noAuth: true
}, login));

app.post('/opinions/new', jwtMiddleware({
    noAuth: false,
}, newOpinion));

app.get('/opinions/all', jwtMiddleware({
    noAuth: false,
}, allOpinions));

import './database/database.js'

app.listen(8080, () => {
    console.log('Server started');
});