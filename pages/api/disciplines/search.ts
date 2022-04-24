import type { NextApiRequest, NextApiResponse } from 'next'

import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
        const content:string = request.query.content.toString()
        var discipline = new Discipline()
        discipline.name = content
        //console.log(discipline)
        const res = await discipline.findOne()
        // console.log(res)

        response.status(200).json(res)


}
