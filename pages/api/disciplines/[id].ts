import type { NextApiRequest, NextApiResponse } from 'next'
import { disciplines } from '../../../data'

export default function disciplinesHandler(request: NextApiRequest, response: NextApiResponse) {

    const id = request.query.id
    const filtered = disciplines.filter((p) => p.id === id)

    // User with id exists
    if (filtered.length > 0) {
        response.status(200).json(filtered[0])
    } else {
        response.status(404).json({ message: `Disciplina com o id: ${id} não encontrada.` })
    }
}
