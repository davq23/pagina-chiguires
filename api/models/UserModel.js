import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {type: String, index: true},
    password: String,
    vetado: Boolean,

    opiniones: [{
        body: String,
        admitida: Boolean,
    }],
});

export default mongoose.model('User', userSchema);