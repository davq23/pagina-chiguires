import UserModel from "../models/UserModel";

const newOpinion = async (req, res) => {
    if (!req.userName || !req.userID) {
        res.status(401).send({
            'message': 'Unauthorized',
        });
    }

    try {
        const user = await UserModel.findOne({
            'userName': req.userName
        });

    } catch(error) {
        console.log(error);
    }
};

const allOpinions = async (req, res) => {
    
}




export {
    newOpinion
};