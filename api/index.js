import express from 'express';
import { newOpinion } from './controllers/OpinionController';
import { login, newUser } from './controllers/UserController';
import jwtMiddleware from './middlewares/JWTMiddleware';

const app = express();

app.use(express.json());

app.post('users/new', jwtMiddleware({
    noAuth: true
}, newUser));

app.post('users/account/login', jwtMiddleware({
    noAuth: true
}, login));

app.get('opinions/new', jwtMiddleware({
    noAuth: false,
}), newOpinion);


app.listen(8080);