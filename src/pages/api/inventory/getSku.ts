// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import knex from "knex"
import dbConnection, { qb } from '../../../config/db_config'
import { creatView } from '../../../services/view/view_service'
import { validateCreateViewPayload } from '../../../shared/appUtils/validation'
import { getSuccessRes, getFailRes, fnRtrnCodes } from '../../../shared/appUtils/response'
import { isGetReq } from '../../../shared/appUtils/comman'
import { getRowsWithWhere } from '../../../shared/dbUtils/genQuery'
import { captureException } from '@sentry/nextjs';
import logger from '../../../shared/appUtils/logUtils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        logger.info('hello world')
        if (isGetReq(req.method) === false) {
            return res.status(405).json({})
        }
        connection = await dbConnection.connect()
        const response = await getRowsWithWhere(
            connection,
            {
                tbl: "sku",
                select: ['skuCode', "name"],
            }
        )
        if (response.data) {
            return getSuccessRes(res, 200, response.data, null)
        } else {
            return getFailRes(res, 400, null, response.msg)
        }
    }
    catch (err) {
        captureException(err, {})
        console.log(err)
        return getSuccessRes(res, 500, null, "getm SKU Exception")
    }
    finally {
        connection?.release()
    }
}

