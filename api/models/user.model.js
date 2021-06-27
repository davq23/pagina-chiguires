import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    userName: {
        type: String, 
        unique: true, 
        index: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    vetado: {
        type: Boolean, 
        default: false
    },
    opinions: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "opinions"
     }]
}, {timestamps: true});

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);  // Await: continúa con lo siguiente mientras esto tarda (con funciones 'async'), permite otros usuarios
    return await bcrypt.hash(password, salt);
}

userSchema.methods.matchPassword = async function(password) {  // function() permite utilizar this.
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model('User', userSchema);