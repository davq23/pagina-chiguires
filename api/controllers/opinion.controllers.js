import UserModel from "../models/user.model.js";
import OpinionModel from "../models/opinion.model.js";

const newOpinion = async (req, res) => {
    const {body} = req.body;

    if (!req.userID) {        
        return res.status(401).send({
            'message': 'Unauthorized',
        });
    }

    if (!body) {
        return res.status(400).send({
            'message': 'Cuerpo de opinión requerido',
        });
    }

    try {
        const user = await UserModel.findById(req.userID).exec();

        if (!user) {
            return res.status(401).send({
                'message': 'Unauthorized',
            });
        }

        const opinion = new OpinionModel({body: body, userID: user._id});

        await opinion.save();

        user.opinions.push(opinion);

        await user.save();

        return res.send(opinion);

    } catch(error) {
        console.log(error);
        
        return res.status(400).send({
            'message': 'Invalid request'
        });
    }
};

const allOpinions = async (req, res) => {
    const opinions = await UserModel.find().select('userName').populate(OpinionModel.collection.name);

    return res.send(opinions);
}

export {
    newOpinion,
    allOpinions
};