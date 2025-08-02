import { authData } from "../models/auth.js";
import { userData } from "../models/user.js";

async function setSessionId(user, sId){
    try{
        //adding the new user in the collection authData.
        const newEntry = {sessionId: sId, userId: user._id};
        await authData.create(newEntry);
    }
    catch(e){
        console.log(e);
    }
}

async function getUserbySessionId(sId){
    try{
        //fetching the userId from the authentication data.
        const userSessionData = await authData.findOne({sessionId: sId});
        if(userSessionData){
            const userID = userSessionData.userId;
            const user = await userData.findOne({_id: userID});
            return user; 
        }
        return null;
    }
    catch(e){
        console.log(e);
    }
}

export{
    setSessionId,
    getUserbySessionId
}