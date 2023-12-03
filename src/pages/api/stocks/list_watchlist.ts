import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnection, { qb } from '../../../config/db_config'
import { listWatchlist } from '../../../services/stocks/stock_service'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({})
        }
        connection = await dbConnection.connect()
        const [response, err] = await listWatchlist(connection)
        if (err) {
            return res.status(200).json({ success: false, msg: err })
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

