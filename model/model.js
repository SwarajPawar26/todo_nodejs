import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: 'backend'
}).then(() => {
    console.log("Database connected..")
}).catch((e)=>{console.log(e)})


const register = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})


export const schema = mongoose.model("Register", register);

export const task = mongoose.model("Task", taskSchema)

