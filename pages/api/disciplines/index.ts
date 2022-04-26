import type { NextApiRequest, NextApiResponse } from 'next'
import Discipline from '../../../models/discipline'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const result = await new Discipline().findAll()
  response.status(200).json(result)
}
