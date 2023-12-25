// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import knex from "knex"
import dbConnection, { qb } from '../../../config/db_config'
import { captureException,captureMessage } from '@sentry/nextjs';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        if (req.method !== 'GET') {
            captureMessage("unsupported method called","info",)
            return res.status(405).json({})
        }
    }
    catch (err) {
        captureException(err, {extra:{msg:"test monitor message"}})
        res.status(500).json({})
    }
    finally {
        connection?.release()
    }
}
