// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_hSKY7vZPLWf2aNa2BKitHVDOsWhRXZtx62vEJEUHWYd',
})

const databaseId = '37503c1d82d04ce38ce3ddcfd05342ff'

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query

  if (name == null) {
    return res.status(400).json({ message: 'NO Name' })
  }

  try {
    await addItem(String(name))
    res.status(200).json({ message: `success ${name}` })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: `Faild` })
  }
}
