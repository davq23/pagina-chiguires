import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (options) => {
    return function (req, res, next) {
        const bearer = req.header('Bearer');

        if (bearer.length !== 1 && !options.noAuth) {
            res.status(401).send({
                message: 'Unauthorized'
            });
        }

        try {
            const payLoad = jwt.verify(bearer[0], process.env.SECRET_TOKEN);

            req.userID = payLoad.userID;
            req.userName = payLoad.userName;
            
            next();
        } catch (err) {
            if (!options.noAuth) {
                next();
            }
        }

    }
};


export default jwtAuthMiddleware;