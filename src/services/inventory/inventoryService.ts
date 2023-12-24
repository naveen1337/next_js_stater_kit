import { qb } from "../../config/db_config";
import { fnRtrnCodes, getFnReturn } from "../../shared/appUtils/response";
import { insertSKUQuery } from "./inventoryUtils"
import { insertRow } from "../../shared/dbUtils/genQuery"


export async function createSkuService(connection: any, payload: any): Promise<any> {
    try {
        const query = insertRow(connection,"sku",payload,["skuCode"])
        // const result = await connection.query(query)
        return getFnReturn(fnRtrnCodes.OK, query, null)
    }
    catch (err) {
        console.log(err)
        return getFnReturn(fnRtrnCodes.EXCEPTION, "unhandled creatView", null)
    }
}