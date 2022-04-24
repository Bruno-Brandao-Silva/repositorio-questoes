import type { NextApiRequest, NextApiResponse } from 'next'

import { disciplines } from '../../../data'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json(disciplines)
}
