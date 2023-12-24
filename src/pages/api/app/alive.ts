// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import knex from "knex"
import dbConnection, { qb } from '../../../config/db_config'
import Ajv from "ajv"
import { aliveCheck } from '../../../services/app/app_sevice'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        const ajv = new Ajv()
        if (req.method !== 'GET') {
            return res.status(405).json({})
        }
        connection = await dbConnection.connect()
        const [response, err] = await aliveCheck(connection)
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
        clientName: { type: "string" },
    },
    required: ["clientName"],
    additionalProperties: false
}