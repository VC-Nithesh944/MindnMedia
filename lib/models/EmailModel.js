import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: { type: String, required: true },
    date:{type:Date, default:Date.now()}
})

// if already present we will use the existing one 
const EmailModel = mongoose.models.email || mongoose.model('email', Schema);
export default EmailModel;