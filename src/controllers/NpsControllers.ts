import { SurveyUsersRepository } from "../repositories/SurveyUsersRepository"
import { getCustomRepository } from "typeorm"

class NpsController {
    async execute(req: Request, res: Request) {
        const { survey_id } = req.params
        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository)

        const surveyUsers = await surveyUsersRepository.find({
            survey_id
        })

        const detractor = surveyUsers.filter(
            survey => survey.value >= 0 && survey.value <= 6
        ).length

        const promoters = surveyUsers.filter(
            survey => survey.value >= 9 && survey.value <= 10
        ).length

        const passive = surveyUsers.filter(
            survey => survey.value >= 7 && survey.value <= 8
        ).length

        const totalAnswers = surveyUsers.length

        const calculate = Number(
            (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
        )

        return res.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        })
    }
}

export { NpsController }