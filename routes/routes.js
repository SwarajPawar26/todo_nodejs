import express from 'express'
import cookieParser from "cookie-parser";
import { loginController, logoutController, showTasks, taskController, updateTask } from '../controllers/control.js';
import { resgisterController } from '../controllers/control.js';


const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser())
router.use(express.json())

router.get("/", (req, res) => {
    res.send("Hii there..")
})

router.get("/logout", logoutController)

router.post("/login", loginController);

router.post("/register", resgisterController);

router.post("/login/task", taskController);

router.get("/login/task/find", showTasks);

router.get("/task/update", updateTask)

export default router;
