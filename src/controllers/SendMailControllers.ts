import { getCustomRepository } from "typeorm"
import {Request, Response } from "express"
import { UsersRepository } from "../repositories/UserRepository"
import { SurveyRepository } from "../repositories/SurveyRepository"
import { SurveyUsersRepository } from "../repositories/SurveyUsersRepository"
import SendMailService from "../services/SendMailService"


class SendMailController {
    async execute(req: Request, res: Response) {

    const { email, survey_id } = req.body

    const usersRepository = getCustomRepository(UsersRepository)
    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository)


    const userAlreadyExists = await usersRepository.findOne({email})

    if (!userAlreadyExists) {
        return res.status(400).json({ error: "User does note exists" })
    }

    const survey = await surveyRepository.findOne({ id: survey_id })

    if (!survey) {
        return res.status(400).json({ error: "Survey does not exist" })
    }

    const surveyUser = surveyUsersRepository.create({
        user_id: userAlreadyExists.id,
        survey_id
    })
    await surveyUsersRepository.save(surveyUser)

    await SendMailService.execute(email, survey.title, survey.description )

    return res.status(200).json(surveyUser)
    }
}

export { SendMailController }