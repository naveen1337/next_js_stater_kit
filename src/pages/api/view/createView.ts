// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import knex from "knex"
import dbConnection, { qb } from '../../../config/db_config'
import { creatView } from '../../../services/view/view_service'
import { validateCreateViewPayload } from '../../../shared/appUtils/validation'
import { getSuccessRes, getFailRes, fnRtrnCodes } from '../../../shared/appUtils/response'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({})
        }
        const validate = validateCreateViewPayload(req.body)
        if (validate.code != fnRtrnCodes.SUCCESS) {
            return getFailRes(res, 400, validate, null)
        }
        connection = await dbConnection.connect()
        const response = await creatView(connection, req.body)
        return res.status(200).json({ success: true, data: response })
    }
    catch (err) {
        console.log(err)
        return res.status(100).json({ status: false, msg: "exception" })
    }
    finally {
        connection?.release()
    }
}

