import { Router } from "express"
import { SendMailController } from "./controllers/SendMailControllers"
import { SurveysController } from "./controllers/SurveysControllers"
import { UserController } from "./controllers/UserControllers"
import { AnswerController } from "./controllers/AnswerControllers"
const router = Router() 

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailsController = new SendMailController()
const answerController = new AnswerController()


router.post("/users", userController.create)
router.post("/surveys", surveyController.create)
router.get("/surveys", surveyController.show)
router.post("/sendMail", sendMailsController.execute)
router.get("/answer/:value", answerController.execute)

export { router }