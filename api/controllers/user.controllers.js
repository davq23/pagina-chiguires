import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const newUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                'message': 'Invalid payload',
            });
        }

        const regexpUsername = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{4,10})');

        let results = regexpUsername.exec(username);

        if (!results || results.length === 0) {
            return res.status(400).send({
                'message': 'Username debe ser de entre 4 y 10 caracteres alfanuméricos',
            });
        }

        const regexpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%&\/])(?=.{8})')

        results = regexpPassword.exec(password);

        if (!results || results.length === 0) {
            return res.status(400).send({
                'message': 'Contraseña debe ser de 8 caracteres alfanuméricos y contener: # $ % & /',
            });
        }

        const newUser = new UserModel({userName: username, password: password});

        newUser.password = await newUser.encryptPassword(password);

        await newUser.save();

        res.status(201).send(newUser);
    } catch(err) {
        console.log(err);

        res.status(400).send({
            'message': 'Invalid payload',
        })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            'message': 'Invalid payload',
        });
    }

    const user = await UserModel.findOne({'userName': username});

    if (!user) {
        return res.status(400).send({
            'message': 'Usuario o contraseña incorrecta',
        });
    }

    const matchPassword = await user.matchPassword(password);

    if (!matchPassword) {
        return res.status(400).send({
            'message': 'Usuario o contraseña incorrecta',
        });
    }

    return res.send(jwt.sign({'data': user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60),}, process.env.SECRET_KEY));
}

export {
    newUser,
    login,
}