import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ObjectId } from 'mongodb'
import Account from '../../../models/profile'

export default async function profileAPI(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({ req })

    if (!session) {
        return res.status(400).json({ message: "Acesso negado." })
    }
    const account = await new Account(undefined, session!.user!.email!).findOne()
    if (req.method == "GET") {
        if (!account) {
            return res.status(404).json({ message: `Perfil com o email: ${session!.user!.email!} não encontrado.` })
        }
        return res.status(200).json(account)

    } else if (req.method == "POST") {
        if (account) {
            return res.status(400).json({ message: "Perfil já existe." })
        }
        const { name, email, role } = req.body
        const newAccount = await new Account(undefined, email, name, role).insertOne()
        res.status(200).json({ message: "Perfil criado.", account: newAccount })

    } else if (req.method == "PUT") {
        if (!account) {
            return res.status(400).json({ message: "Perfil não existe." })
        }
        const { name, email, role } = req.body
        await account.replaceOne(new Account(undefined, email, name, role))
        res.status(200).json({ message: "Perfil substituído." })

    } else if (req.method == "PATCH") {

        if (!account) {
            return res.status(400).json({ message: "Perfil não existe." })
        }
        const { name, email, role } = req.body
        await account.updateOne(new Account(undefined, email, name, role))
        res.status(200).json({ message: "Perfil atualizado." })

    } else if (req.method == "DELETE") {

        if (!account) {
            return res.status(400).json({ message: "Perfil não existe." })
        }
        await account.deleteOne()
        res.status(200).json({ message: "Perfil excluído." })

    } else {
        res.status(400).json({ message: "Método invalido." })
    }
}