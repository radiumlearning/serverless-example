import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User"

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, name },
    body,
    method,
  } = req

  
  switch (method) {
    case 'GET':
      try {
        await dbConnect()
        const result = await User.find({ id })
        res.status(200).json({ success: true, data: result })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        await dbConnect()
        const result = await User.findOneAndUpdate({ id }, body, { new: true })
        res.status(200).json({ success: true, data: result })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
