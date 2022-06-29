import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Account from '../../../models/profile'

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    const email = req.query.email ? req.query.email.toString() : session!.user!.email!
    const filtered = await new Account(undefined, email).findOne()
    if (filtered) {
        res.status(200).json(filtered)
    } else {
        res.status(404).json({ message: `Perfil com o email: ${email} não encontrado.` })
    }
}
