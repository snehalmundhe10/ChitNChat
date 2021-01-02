import mongoose from 'mongoose'
//schema
const juschatSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: String 
});

export default mongoose.model('messagecontents', juschatSchema)