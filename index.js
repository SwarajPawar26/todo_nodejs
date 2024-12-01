import express from 'express';
import router from './routes/routes.js';


const app = express();

app.set("view engine", "ejs");

app.use(router)

app.listen(4000, (req, res) => {
    console.log("App is running");
})
