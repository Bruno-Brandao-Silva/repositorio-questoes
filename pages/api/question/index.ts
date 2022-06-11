import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    try {
      const result = await new Discipline().findAll();
      response.status(200).json(result)
    } catch (err) {
      response.status(500).json(err)
    }
  }
  else if (request.method === 'POST') {
    try {
      const { name, description, length, imageFilesName } = request.body
      console.log(imageFilesName)
      const discipline = new Discipline(undefined, name, description, length, imageFilesName)
      console.log(discipline)

      const resp = await discipline.insertOne()
      response.status(200).json(resp)
    } catch (err) {
      response.status(500).json(err)
    }
  } else {
    response.status(404).end()
  }
}
