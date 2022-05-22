import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    try {
      const result = await new Discipline().findAll();
    response.status(200).json(result)
    }catch (err) {
      response.status(500).json(err)
    }
  }
  else if (request.method === 'POST') {
    try {
      const id = request.body.id.toString()
      const name = request.body.name.toString()
      const description = request.body.description.toString()
      const length = request.body.length.toString()
      const discipline = new Discipline(id, name, description, length)
      response.status(200).json(await discipline.insertOne())
    }catch (err) {
      response.status(500).json(err)
    }
  } else {
    response.status(404).end()
  }
}
