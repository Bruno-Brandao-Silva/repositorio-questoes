import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function disciplinesHandler(request: NextApiRequest, response: NextApiResponse) {

    const id = request.query.id.toString()
    const filtered = await new Discipline(id).findOne()
    
    if (filtered) {
        response.status(200).json(filtered)
    } else {
        response.status(404).json({ message: `Disciplina com o id: ${id} não encontrada.` })
    }
}
