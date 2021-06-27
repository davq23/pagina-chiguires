import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (options, next) => {
    return function (req, res) {
        const bearer = req.header('Bearer');

        if (typeof(bearer) === 'undefined' && options.noAuth) {
            return next(req, res);
        }

        if (!bearer && !options.noAuth && !options.noAuth) {
            res.status(401).send({
                message: 'Unauthorized'
            });

            return;
        }

        try {
            const payLoad = jwt.verify(bearer, process.env.SECRET_KEY);

            req.userID = payLoad.data;
            
            return next(req, res);
        } catch (err) {
            if (options.noAuth) {
                return next(req, res);
            }
        }
        return res.status(401).send({
            'message': 'Unauthorized'
        });
    }
};


export default jwtAuthMiddleware;