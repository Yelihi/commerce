// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_hSKY7vZPLWf2aNa2BKitHVDOsWhRXZtx62vEJEUHWYd',
})

const databaseId = '37503c1d82d04ce38ce3ddcfd05342ff'

async function getItem() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await getItem()
    res.status(200).json({ items: response?.results, message: `success` })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: `Faild` })
  }
}
