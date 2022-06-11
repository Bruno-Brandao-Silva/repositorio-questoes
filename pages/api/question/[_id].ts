import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import Question from '../../../models/question'

export default async function questionHandler(request: NextApiRequest, response: NextApiResponse) {

    const _id = new ObjectId(request.query._id.toString())
    const filtered = await new Question(_id).findOne()
    
    if (filtered) {
        response.status(200).json(filtered)
    } else {
        response.status(404).json({ message: `Questão com o id: ${_id} não encontrada.` })
    }
}
