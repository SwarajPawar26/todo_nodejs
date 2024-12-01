import jwt from 'jsonwebtoken';
import { schema, task } from '../model/model.js';

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    let user = await schema.findOne({ email });

    if (!user) {
        return res.send("You need to register first")
    }
    user = await schema.create({ email: email, password: password });

    const token = jwt.sign({ _id: user._id }, "wdgsfh");

    res.cookie("token", token, {
        expire: new Date(Date.now + 60 * 1000),
        httponly: true,
        sameSite: 'lax',
        secure: false

    })
    res.send("Logged in..")
}

export const resgisterController = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await schema.findOne({ email });

    if (user) {
        return res.send("User already exists..")
    }

    schema.create({ name: name, email: email, password: password });
    res.send("Registered successfully..");
}

export const logoutController = (req, res) => {
    res.cookie("token", null, {
        expires: new Date(0)
    }).send("Logged out")
}

export const taskController = async (req, res, next) => {

    const { remove, value } = req.query;
    if (remove === "true") {
        return next();
    }
    const token = req.cookies.token;
    if (!token) {
        return res.send("You need to login first..")
    }
    const { title, description, completed } = req.body;
    await task.create({ title: title, description: description, completed: completed });
    res.send("Task added successfully..")
}

export const showTasks = async (req, res) => {
    const tasks = await task.find();
    res.json(tasks);
}

export const updateTask = async (req, res) => {
    const {id} = req.query;
    const title = await task.findById(id);
    title.completed = !title.completed;
    title.save();
    res.send("Task updated successfully..")
}

