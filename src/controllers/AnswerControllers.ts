import { SurveyUsersRepository } from "../repositories/SurveyUsersRepository"
import { getCustomRepository } from "typeorm"
import { Request, Response } from "express"

// rote params => app.router("/answer/:nota")
//query params => parametros pra busca, paginacao. Vem apos o ponto de interrogacao
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
                error: "Survey User does not exists"
           })
        }

        surveyUser.value = Number(value)

        await surveyUsersRepository.save(surveyUser)

        return res.json(surveyUser)
    }
}

export { AnswerController }