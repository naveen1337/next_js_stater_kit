import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnection, { qb } from '../../../config/db_config'
import { hardDeleteRows } from '../../../services/capital/capital_service'
import Ajv from 'ajv'

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
        connection = await dbConnection.connect()
        const valid = ajv.validate(schema, req.body)
        if (!valid) {
            return res.status(400).json({ success: true, msg: ajv?.errors?.[0]?.message })
        }
        const [response, err] = await hardDeleteRows(connection, req.body.rowId)
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
        rowId: { type: "integer" },
    },
    required: ["rowId"],
    additionalProperties: false
}