// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import knex from "knex"
import dbConnection, { qb } from '../../../config/db_config'
import Ajv from "ajv"
import { addSector } from '../../../services/stocks/stock_service'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        const ajv = new Ajv()
        if (req.method !== 'POST') {
            return res.status(405).json({})
        }
        const valid = ajv.validate(schema, req.body)
        if (!valid) {
            return res.status(400).json({ success: true, msg: ajv?.errors?.[0]?.message })
        }
        connection = await dbConnection.connect()
        const [response, err] = await addSector(connection, req.body)
        if (err) {
            return res.status(400).json({ success: false, msg: err })
        }
        return res.status(200).json({ success: true, data: response })
    }
    catch (err) {
        connection?.release()
        console.log(err)
        return res.status(500).json({ status: false, msg: "exception" })
    }
    finally {
        connection?.release()
    }
}


const schema = {
    type: "object",
    properties: {
        sector_name: { type: "string" },
    },
    required: ["sector_name"],
    additionalProperties: false
}