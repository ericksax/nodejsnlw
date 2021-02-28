import { Router } from "express"
import { SendMailController } from "./controllers/SendMailControllers"
import { SurveysController } from "./controllers/SurveysControllers"
import { UserController } from "./controllers/UserControllers"

const router = Router() 

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailsController = new SendMailController()

router.post("/users", userController.create)
router.post("/surveys", surveyController.create)
router.get("/surveys", surveyController.show)
router.post("/sendMail", sendMailsController.execute)


export { router }