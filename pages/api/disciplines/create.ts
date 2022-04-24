import type { NextApiRequest, NextApiResponse } from 'next'

import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
        const id = request.body.id.toString()
        const name = request.body.name.toString()
        const description = request.body.description.toString()
        const length = request.body.length.toString()
        const discipline = new Discipline(id, name, description, length)
        response.status(200).json(await discipline.insertOne())

    } else {
        response.status(404).json([0])
    }

}
