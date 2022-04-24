import type { NextApiRequest, NextApiResponse } from 'next'
import database from '../../../models/database'
import Discipline from '../../../models/discipline'

export default async function disciplinesHandler(request: NextApiRequest, response: NextApiResponse) {
    const id = request.query.id.toString()
    const discipline = new Discipline('69', 'Prog', 'Alg 2', '420')
    if (id == '1') {

        response.status(200).json(await discipline.insertOne())
    } if (id == '2') {
        response.status(200).json(await discipline.findAll())
    } else {
        response.status(200).json([0])
    }
    response.status(200)

}