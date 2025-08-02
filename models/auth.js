import { mongoose } from 'mongoose';

const authSchema = new mongoose.Schema({
    sessionId : {
        type: String,
        required: true
    },
    userId: {
        type: Object,
        required: true
    }
});
//session id is the uuid while userid is the _id of user.
const authData = mongoose.model('authData', authSchema);

export{
    authData
}