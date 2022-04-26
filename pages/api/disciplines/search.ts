import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
        const content:string = request.query.content.toString()
        var discipline = new Discipline()
        discipline.name = content
        const res = await discipline.findOne()
        response.status(200).json(res)
}
