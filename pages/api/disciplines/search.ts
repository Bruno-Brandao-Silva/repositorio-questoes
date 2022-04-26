import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
        const content: string = request.query.content.toString()
        var discipline = new Discipline()
        discipline.name = content
        const res = await discipline.findOne()
        if (res) {
                response.status(200).redirect(`/discipline/${res.id}`)
        } else{
                response.status(200).redirect(`/discipline/nothing-was-found`)
        }

}
