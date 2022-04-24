import type { NextApiRequest, NextApiResponse } from 'next'
import database from '../../../models/database'

export default async function disciplinesHandler(request: NextApiRequest, response: NextApiResponse) {
    const id = request.query.id
    if (id == '1') {
        database.insert({nome: 'Bruno'})
        response.status(200)
    } if (id == '2') {
        const result = await database.collect()
        response.status(200).json({ result })
    } else {
        response.status(200).json([0])
    }
    response.status(200)

}