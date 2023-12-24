import { qb } from "../../config/db_config";

export function insertSKUQuery(payload:any){
    try{
        const query = qb('books').insert({title: 'hello'}).toString()
        return query
    }catch(err){
        return null
    }
}