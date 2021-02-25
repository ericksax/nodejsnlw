import { Router } from "express"
import { SurveysController } from "./controllers/SurveysControllers"
import { UserController } from "./controllers/UserControllers"

const router = Router() 

const userController = new UserController()
const surveyController = new SurveysController()

router.post("/users", userController.create)
router.post("/surveys", surveyController.create)
router.get("/surveys", surveyController.show)


export { router }