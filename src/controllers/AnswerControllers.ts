import { SurveyUsersRepository } from "../repositories/SurveyUsersRepository"
import { getCustomRepository } from "typeorm"

// rote params => app.router("/answer/:nota")
class AnswerController {
    async execute(req: Request, res: Response) {
        const { value } = req.params
        const { u } = req.query

        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository)
        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u)
        })
        if(!surveyUser) {
            return res.status(400).json({
                error: "Survey User dos not exists"
           })
        }

        surveyUser.value = Number(value)

        await surveyUsersRepository.save(surveyUser)

        return res.json(surveyUser)
    }
}

export { AnswerController }