import { mongoose } from "mongoose";

//creating new user Schema, timestamps is the second argument.
const urlSchema = new mongoose.Schema({
    newUrl:{
        type: String,
        unique: true,
        require: true
    },
    oldUrl:{
        type: String,
        require: true
    },
    visitedHistory: {
        type: [{timestamps: Number}],
        require:true
    },
    generatedBy: {
        type: Object,
        require: true
    }
}, {timestamps : true})

//now creating a model
const urlData = mongoose.model("urlDoc", urlSchema);

//exporting the collection.
export{
    urlData
}
