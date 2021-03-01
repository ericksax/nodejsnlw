import { getCustomRepository } from "typeorm"
import {Request, Response } from "express"
import { UsersRepository } from "../repositories/UserRepository"
import { SurveyRepository } from "../repositories/SurveyRepository"
import { SurveyUsersRepository } from "../repositories/SurveyUsersRepository"
import SendMailService from "../services/SendMailService"
import {resolve} from "path"


class SendMailController {
    async execute(req: Request, res: Response) {

    const { email, survey_id } = req.body

    const usersRepository = getCustomRepository(UsersRepository)
    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyUsersRepository = getCustomRepository(SurveyUsersRepository)


    const user = await usersRepository.findOne({email})

    if (!user) {
        return res.status(400).json({ error: "User does note exists" })
    }

    const survey = await surveyRepository.findOne({ id: survey_id })

    if (!survey) {
        return res.status(400).json({ error: "Survey does not exist" })
    }
    
    
    const variables = {
        name: user.name,
        title: survey.title, 
        description: survey.description,
        user_id: user.id,
        Link: process.env.URL_MAIL,
    }
    
    const npsPath = resolve(__dirname, "..", "views", "email", "emailTemplate.hbs")

    const surveyUsersAlreadyExists = await surveyUsersRepository.findOne({ 
        where: [{user_id: user.id}, {value: null}],
        relations: ["user", "survey"]
    })
  

    if(surveyUsersAlreadyExists) {
        await SendMailService.execute(email, survey.title, variables, npsPath)
        return res.json(surveyUsersAlreadyExists)
    }

    const surveyUser = surveyUsersRepository.create({
        user_id: user.id,
        survey_id
    })
    await surveyUsersRepository.save(surveyUser)


    await SendMailService.execute(email, survey.title, variables, npsPath)

    return res.status(200).json(surveyUser)
    }
}

export { SendMailController }