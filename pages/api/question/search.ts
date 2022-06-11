import type { NextApiRequest, NextApiResponse } from 'next'
import Question from '../../../models/question'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
        const title: string = request.query.name.toString()
        var question = new Question()
        question.title = title
        const res = await question.findOne()
        if (res) {
                response.status(200).redirect(`/question/${res._id}`)
        } else {
                response.status(404).end()
        }
}
