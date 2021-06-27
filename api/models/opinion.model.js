import mongoose from 'mongoose';
const { Schema } = mongoose;

const opinionSchema = new Schema({
    body: {
        type: String, 
        required: true
    },
    allowed: {
        type: Boolean, 
        default: false
    },

    userID: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true});

export default mongoose.model('opinions', opinionSchema);