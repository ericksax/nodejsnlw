import { Router } from "express"
import { SendMailController } from "./controllers/SendMailControllers"
import { SurveysController } from "./controllers/SurveysControllers"
import { UserController } from "./controllers/UserControllers"
import { AnswerController } from "./controllers/AnswerControllers"
import { NpsControllers } from "./controllers/NpsControllers"
const router = Router() 

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailsController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsControllers()


router.post("/users", userController.create)
router.post("/surveys", surveyController.create)
router.get("/surveys", surveyController.show)
router.post("/sendMail", sendMailsController.execute)
router.get("/answers/:value", answerController.execute)
router.get("/nps/:survey_id", npsController.execute)

export { router }