import { qb } from "../../config/db_config";
import { fnRtrnCodes, getFnReturn } from "../../shared/appUtils/response";
import { insertSKUQuery } from "./inventoryUtils"
import { insertRow } from "../../shared/dbUtils/genQuery"


export async function createSkuService(connection: any, payload: any): Promise<any> {
    try {
        const query = await insertRow(connection,"sku",payload,["skuCode"])
        if(query.code != fnRtrnCodes.OK){
            return getFnReturn(fnRtrnCodes.OK, query, null)
        }
        // const result = await connection.query(query)
    }
    catch (err) {
        console.log(err)
        return getFnReturn(fnRtrnCodes.EXCEPTION, "unhandled creatView", null)
    }
}