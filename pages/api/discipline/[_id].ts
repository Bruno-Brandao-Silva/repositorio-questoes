import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function disciplinesHandler(request: NextApiRequest, response: NextApiResponse) {

    try {
        const _id = new ObjectId(request.query._id.toString())
        const filtered = await new Discipline(_id).findOne()

        if (filtered) {
            response.status(200).json(filtered)
        } else {
            response.status(404).json({ message: `Disciplina com o id: ${_id} não encontrada.` })
        }
    } catch (err) {
        console.log(err)
    }
}
