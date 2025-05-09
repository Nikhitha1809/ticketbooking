import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const userModel = new model("users",userSchema);
export default userModel;