import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
        const name: string = request.query.name.toString()
        var discipline = new Discipline()
        discipline.name = name
        const res = await discipline.findOne()
        if (res) {
                response.status(200).redirect(`/discipline/${res._id}`)
        } else {
                response.status(200).redirect(`/discipline/nothing-was-found`)
        }

}
