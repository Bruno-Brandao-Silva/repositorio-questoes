import type { NextApiRequest, NextApiResponse } from 'next'
import { title } from 'process';
import Question from '../../../models/question'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    try {
      const result = await new Question().findAll();
      response.status(200).json(result)
    } catch (err) {
      response.status(500).json(err)
    }
  }
  else if (request.method === 'POST') {
    try {
      const { title, description, content, imageFilesName } = request.body
      // console.log(imageFilesName)
      const question = new Question(undefined, title, description, content, imageFilesName)
      // console.log(question)

      const resp = await question.insertOne()
      response.status(200).json(resp)
    } catch (err) {
      response.status(500).json(err)
    }
  } else {
    response.status(404).end()
  }
}