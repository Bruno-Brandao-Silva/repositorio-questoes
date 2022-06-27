import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import Account from '../../../models/profile'

export default async function profileHandler(request: NextApiRequest, response: NextApiResponse) {

    const email = request.query.email.toString()
    const filtered = await new Account(undefined, email).findOne()

    if (filtered) {
        response.status(200).json(filtered)
    } else {
        response.status(404).json({ message: `Perfil com o email: ${email} não encontrado.` })
    }
}
