// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import knex from "knex"
import dbConnection, { qb } from '../../../config/db_config'
import { createSkuService } from '../../../services/inventory/inventoryService'
import { getSuccessRes, getFailRes, fnRtrnCodes, getFnReturn } from '../../../shared/appUtils/response'
import Joi from "joi";
import { isGetReq, isPostReq } from '../../../shared/appUtils/comman'
import { uniqueConstraintCheck } from '../../../shared/dbUtils/genQuery'

// src/pages/api/inventory/createSku.ts

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        const httpContext = {
            req,
            res,
        };
        if (isPostReq(req.method) === false) {
            return res.status(405).json({})
        }
        const payload = validate(req.body)
        if (payload.code !== fnRtrnCodes.OK) {
            return getFailRes(res, 400, null, payload.msg)
        }

        connection = await dbConnection.connect()

        const isExistsCheck = await uniqueConstraintCheck(connection,
            {
                tbl: "sku",
                select: ['skuCode','name'],
                input: { skuCode:payload.data.skuCode,name:payload.data.name }
            }
        )
        if(isExistsCheck.code !== fnRtrnCodes.OK){
            return getFailRes(res,400,null,isExistsCheck.msg)
        }

        const response = await createSkuService(connection, payload.data)


        if (response.code !== fnRtrnCodes.OK) {
            return getFailRes(res, 400, null, response.msg)
        }
        return getSuccessRes(res, 200, response.data, null)
    }
    catch (err) {
        console.log(err)
        return getFailRes(res, 500, null, null)
        return res.status(100).json({ status: false, msg: "exception" })
    }
    finally {
        connection?.release()
    }
}

export function validate(payload: any): ReturnType<typeof getFnReturn> {
    try {
        const schema = Joi.object({
            skuCode: Joi.string().trim().min(3).max(30).required(),
            name: Joi.string().trim().min(3).max(30).required(),
        })
        const validate = schema.validate(payload, { stripUnknown: true })
        if (validate?.error?.details) {
            return getFnReturn(fnRtrnCodes.FAIL, null, validate.error.details[0].message)
        } else {
            return getFnReturn(fnRtrnCodes.OK, validate.value, null)
        }
    } catch (err) {
        return getFnReturn(fnRtrnCodes.EXCEPTION, 'failed in validation', null)
    }
}
