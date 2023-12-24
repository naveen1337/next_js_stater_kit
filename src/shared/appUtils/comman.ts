export function isGetReq(method?:string){
    if(method === "GET"){
        return true
    }
    return false
}

export function isPostReq(method?:string){
    if(method === "POST"){
        return true
    }
    return false
}

export function isUpdateReq(method?:string){
    if(method === "UPDATE"){
        return true
    }
    return false
}

export function isDeleteReq(method?:string){
    if(method === "DELETE"){
        return true
    }
    return false
}